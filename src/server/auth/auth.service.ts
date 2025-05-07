
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    if (typeof username !== 'string') {
    throw new Error('Username must be a string');
  }
    // const user = await this.usersService.findOne(username);
    
    
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    




    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    
    // const payload = { sub: user.id, username: user.username };
    
    
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
    return {
      access_token: 'asdasdsa',
    };
  }
}
