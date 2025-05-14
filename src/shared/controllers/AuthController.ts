import { BackendMethod, remult, repo, UserInfo, withRemult } from 'remult';
import type express from 'express';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type from 'cookie-session'; 
import { User, UserRole, Roles, RolePermission } from '../User.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';




declare module 'remult' {
  export interface RemultContext {
    request?: express.Request;
  }
}


@Injectable()
export class AuthController {

  // constructor(private jwtService: JwtService){}

  @BackendMethod({ allowed: true })
  static async signIn(username: string, password: string) {
    const user = await remult.repo(User).findFirst(
      { 
        username: username
      }
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      
      const uuser_with_roles = await repo(User).findId(user.id,{
        include:{userRoles: true,}
      });
      
      // console.log('-----------------------',uuser_with_roles);

      if(uuser_with_roles){

       const roles =  uuser_with_roles!.userRoles?.map(async ur=> ur.role!).filter(Boolean);

        // const roles =  uuser_with_roles!.userRoles![0];

        // if(roles){
          console.log('----ROLE-------------------',roles);
        // }
        // const permissions = [...new Set(roles?.flatMap(async r => (await r).permissions))];
        // console.log('----PRR-------------------',permissions);
        
      }

      

      // uuser_with_roles!.roles!.map(async(r)=> {
      //   const role=  await repo(Roles).findId(1);
      //   
      //   // const role = await repo(Roles).findId(r!.id);
      //   // const permissions = role!;
      //   // console.log('-----------------------',role);
      // });

      remult.user = <UserInfo | undefined>{
        id: user.id.toString(),
        name: user.name,
        roles: [],
        permissions: [],
      };

      return remult.user;


      // const payload = {
      //   sub: user.id,
      //   name: user.name,
      // };
  
      // const jwtService = new JwtService();
      // // const accessToken = jwtService.sign(payload, { expiresIn: '24h' });
      // const accessToken = jwtService.sign(payload, {
      //   secret: process.env['JWT_SECRET'],
      //   expiresIn: process.env['JWT_EXPIRES_IN']
      // });
      // const refreshToken = jwtService.sign(payload, {
      //   secret: process.env['JWT_REFRESH_SECRET'],
      //   expiresIn: process.env['JWT_REFRESH_EXPIRES_IN']
      // });
    // const refreshToken = jwtService.sign(payload, { expiresIn: '7d' });

    // // // Hash the refresh token before storing it
    // const saltRounds = 10; // Use a standard number of salt rounds
    // const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
    
    // user.refresh_token = hashedRefreshToken;
    // const userRepo = remult.repo(User);
    // await userRepo.save(user);

    // const me = await this.getMe(user.id); 
      // remult.context.request?.session['user'];
    // return {
    //   accessToken,
    //   refreshToken,
    //   user: me,
    // };
    

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


  static async whoAmI(){
   return remult.user;
   //extend more
  }
}
