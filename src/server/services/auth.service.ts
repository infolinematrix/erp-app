
import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { KnexService } from '../services/knex.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly knexService: KnexService, configService: ConfigService) { }

  //--Login
  async login(body: { username: string; password: string, center_code?:string }) {
    const user = await this.knexService
      .db('users as u')
      .leftJoin('user_roles as ur', 'u.id', 'ur.user_id')
      .leftJoin('roles as r', 'ur.role_id', 'r.id')
      .where('u.email', body.username) // Assuming email is used as username
      .andWhere('u.center_code', body.center_code || 'MAIN')
      .select(
        'u.id',
        'u.email','u.name',
        'u.name as username', // ✅ Ensure username is fetched
        this.knexService.db.raw('JSON_ARRAYAGG(DISTINCT r.name) as roles')
      )
      .groupBy('u.id')
      .first();

    if (!user || !user.username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      center_code: body.center_code || 'MAIN',
      username: user.email,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Hash the refresh token before storing it
    const saltRounds = 10; // Use a standard number of salt rounds
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);

    await this.knexService.db('users').where({ id: user.id }).update({
      refresh_token: hashedRefreshToken,
    });

    const me = await this.getMe(user.id);

    return {
      accessToken,
      refreshToken,
      user: me,
    };
  }

  //--Refresh
  async refresh(body: { refreshToken: string }) {
    const decoded = this.jwtService.verify(body.refreshToken);

    const user = await this.knexService.db('users').where({ id: decoded.sub }).first();
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!(await bcrypt.compare(body.refreshToken, user.refresh_token))) {
      throw new UnauthorizedException('Refresh token mismatch');
    }

    const newAccessToken = this.jwtService.sign(
      { sub: user.id, username: user.username, roles: user.roles },
      { expiresIn: '15m' }
    );

    return { accessToken: newAccessToken };
  }

  //--Me
  async getMe(userId: number) {
    const user = await this.knexService
      .db('users as u')
      .leftJoin('user_roles as ur', 'u.id', 'ur.user_id')
      .leftJoin('roles as r', 'ur.role_id', 'r.id')
      .leftJoin('role_permissions as rp', 'r.id', 'rp.role_id')
      .leftJoin('permissions as p', 'rp.permission_id', 'p.id')
      .where('u.id', userId)
      .select(
        'u.id',
        'u.email',
        'u.name',
        'u.center_code',
        this.knexService.db.raw('JSON_ARRAYAGG(DISTINCT r.name) as roles'),
        this.knexService.db.raw('JSON_ARRAYAGG(DISTINCT p.name) as permissions')
      )
      .groupBy('u.id')
      .first();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      roles: JSON.parse(user.roles ?? '[]'), // Parse or default to empty array
      permissions: JSON.parse(user.permissions ?? '[]')?.filter(Boolean), // Parse and remove null values
    };
  }

  async getXFromHeader(request:Request) {
        
    const userString = (request.headers as { 'x-user'?: string })['x-user'];
    const center_code = (request.headers as { 'x-center'?: string })['x-center'];
    const user = parseInt(userString? userString : '0', 10);
    return {user, center_code};
  }

}
