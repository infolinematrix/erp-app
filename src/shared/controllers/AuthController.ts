import { BackendMethod, remult, repo, UserInfo, withRemult } from 'remult';
import type express from 'express';
// import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type from 'cookie-session';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import bcrypt from 'bcryptjs';
import { Permission, Roles, User } from '../User.entity';


/**
 * const currentUser = {
        id: user.id.toString(),
        user_type: user.user_type,
        user_center: user.center_code,
        name: user.name,
        email: user.username,
        roles: user.roles || [],
        permissions: user.permissions || [],
      };
 */
declare module 'remult' {
  export interface RemultContext {
    request?: express.Request;
    user?: UserInfo;
  
  }
}

// @Injectable()
export class AuthController {
  @BackendMethod({ allowed: true })
  static async signIn(username: string, password: string): Promise<{
    id: number;
    name: string;
    username: string;
    user_type: string;
    user_center: string;
    roles: string[];
    permissions: string[];
  }> {
    const user = await remult.repo(User).findFirst({ username });

    if (!user) {
      throw new Error('Invalid user');
    }

    const bcrypt = require('bcryptjs');
    const isPasswordValid = await bcrypt.compare(password, user.password);
   
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const user_with_roles = await remult.repo(User).findId(user.id, {
      include: { userRoles: true },
    });

    const roles: string[] = [];
    const permissions: string[] = [];

    if (user_with_roles?.userRoles?.length) {
      const roleEntities = await Promise.all(
        user_with_roles.userRoles.map((ur) => remult.repo(Roles).findId(ur.role_id))
      );

      for (const role of roleEntities.filter(Boolean)) {
        roles.push(role!.name);

        if (role?.permissions?.length) {
          const permissionEntities = await Promise.all(
            role.permissions.map((p) => remult.repo(Permission).findId(p.permission_id))
          );

          for (const per of permissionEntities.filter(Boolean)) {
            permissions.push(per!.name);
          }
        }
      }
    }

    return {
      id: user.id,
      name: user.name || '',
      username: user.username || '',
      user_type: user.user_type || '',
      user_center: user.center_code || '',
      roles,
      permissions,
    };
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
