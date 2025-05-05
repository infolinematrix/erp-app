import { BackendMethod, remult, UserInfo } from 'remult';
import type express from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type from 'cookie-session'; 
import { User } from '../User.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

declare module 'remult' {
  export interface RemultContext {
    request?: express.Request;
  }
}
export class AuthController {
  //
  @BackendMethod({ allowed: true })
  static async signIn(email: string, password: string) {
    const user = await remult.repo(User).findFirst({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      remult.user = {
        id: user.id.toString(),
        name: user.name,
        roles: [],
        // permissions: [],
      };

      
      
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }

   
  }

  @BackendMethod({ allowed: true })
  static async signOut() {
    remult.context.request!.session!['user'] = undefined;
    return undefined;
  }

  static getCurrentUser() {
    return remult.context.request!.session!['user'];
  }
}
