import { BackendMethod, remult, repo, UserInfo, withRemult } from 'remult';
import type express from 'express';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type from 'cookie-session';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Permission, Roles, User } from '../User.entity';
import { KnexService } from '../../server/services/knex.service';
import knex from 'knex';

declare module 'remult' {
  export interface RemultContext {
    request?: express.Request;
  }
}

@Injectable()
export class AuthController {
  @BackendMethod({ allowed: true })
  static async signIn(username: string, password: string) {
    const user = await remult.repo(User).findFirst({
      username: username,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (isPasswordValid) {
      
      const user_with_roles = await repo(User).findId(user.id, {
        include: { userRoles: true },
      });

      if (user_with_roles) {
        const roles = user_with_roles!.userRoles
          ?.map(async (ur) => ur.role!)
          .filter(Boolean);
        if (roles) {
          const permissions = [
            ...new Set(roles?.flatMap(async (r) => (await r).permissions)),
          ];
        }
      }

      const roles:string[] = [];
      const permissions:string[] = [];
        user_with_roles!.userRoles!.map(async(r)=> {
          const role=  await repo(Roles).findId(r.role_id);
          roles.push(...role!.name);
          if(role?.permissions){
            
            role?.permissions.map(async(p)=>{
              const per = await repo(Permission).findId(p.permission_id);
              permissions.push(...per!.name)
            })
          }
          
        
          // const role = await repo(Roles).findId(r!.id);
          // const permissions = role!;
          // console.log('-----------------------',role);
        });


        return {
          id: user.id,
          name: user.name,
          username: user.username,
          user_type: user.user_type,
          user_center: user.center_code,
          roles:roles || [],
          permissions:permissions || [],
        };


      // remult.user = <UserInfo | undefined>{
      //   id: user.id.toString(),
      //   name: user.name,
      //   roles: [],
      // };

      // const payload = {
      //   sub: user.id,
      //   name: user.name,
      // };

      // remult.user = async (req) => {
      //   try {
      //     const token = getJwtTokenFromRequest(req);
      //     if (token) {
      //       const payload = await verifyToken(token);
      //       return {
      //         id: payload.sub,
      //         name: payload.username,
      //         roles: payload.roles || [],
      //       };
      //     }
      //   } catch (err) {
      //     // Invalid token - user is not authenticated
      //   }
      //   return undefined;
      // };

      // const jwtService = new JwtService({
      //   secret: process.env['JWT_SECRET'] || 'my-secret',
      // });

      // const jwtService = new JwtService();
      // const accessToken = jwtService.sign(payload, {
      //   secret: process.env['JWT_SECRET'],
      //   expiresIn: process.env['JWT_EXPIRES_IN']
      // });
      // const refreshToken = jwtService.sign(payload, {
      //   secret: process.env['JWT_REFRESH_SECRET'],
      //   expiresIn: process.env['JWT_REFRESH_EXPIRES_IN']
      // });

      // // // // Hash the refresh token before storing it
      // // const saltRounds = 10; // Use a standard number of salt rounds
      // // const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);

      // // user.refresh_token = hashedRefreshToken;
      // // const userRepo = remult.repo(User);
      // // await userRepo.save(user);

      // const me = await this.getMe(user.id);
      //   // remult.context.request?.session['user'];
      // return {
      //   accessToken,
      //   refreshToken,
      //   user: user,
      // };

      

      // } else {
      //   throw new UnauthorizedException('Invalid credentials');
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // @BackendMethod({ allowed: true })
  // static async signOut() {
  //   remult.context.request!.session!['user'] = undefined;
  //   return undefined;
  // }

  // static getCurrentUser() {
  //   return remult.context.request!.session!['user'];

  // }

  static async whoAmI() {
    return remult.user;
    //extend more
  }
}
