import { BackendMethod, remult, repo, UserInfo, withRemult } from 'remult';
import type express from 'express';
// import bcrypt from 'bcryptjs';
import { Permission, Roles, User } from '../User.entity';


declare module 'remult' {
  export interface RemultContext {
    request?: express.Request;
    user?: UserInfo;
  }
}

export class AuthController {

constructor() { }


  @BackendMethod({ allowed: true })
  static async signIn(
    username: string,
    password: string
  ): Promise<{
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


    const userWithRoles = await remult.repo(User).findId(user.id, {
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });


    const roles: string[] = [];
    const permissionsSet = new Set<string>();

    
    if (userWithRoles?.userRoles?.length) {
    for (const ur of userWithRoles.userRoles) {
      const role = ur.role;
      if (role) {
        roles.push(role.name);
        if (role.permissions?.length) {
          for (const rp of role.permissions) {
            if (rp.permission) {
              permissionsSet.add(rp.permission.name);
            }
          }
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
      permissions: Array.from(permissionsSet),
    };
  }

  static async whoAmI() {
    return remult.user;
  }
}
