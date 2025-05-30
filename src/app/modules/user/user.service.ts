import { Injectable } from '@angular/core';
import { remult, repo } from 'remult';
import { Observable } from 'rxjs';
import {
  Permission,
  RolePermission,
  Roles,
  User,
  UserRole,
} from '../../../shared/User.entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userRepo = repo(User);
  roleRepo = repo(Roles);
  permissionRepo = repo(Permission);
  rolePermissionRepo = repo(RolePermission);
  userRoleRepo = repo(UserRole);


  constructor() {}

  async getRoles(): Promise<Roles[]> {
    const data = await this.roleRepo.find();
    return data;
  }

  async getPermissions(): Promise<Permission[]> {
    const data = await this.permissionRepo.find();
    return data;
  }

  async createRole(title: string, description: string) {
    const isExist = await this.roleRepo.findFirst({ name: title });

    if (!isExist) {
      this.roleRepo.insert({
        name: title,
        description: description,
      });
      return true;
    } else {
      return false;
    }
  }

  async createPermission(title: string, description: string) {
  
    const isExist = await this.roleRepo.findFirst({ name: title });

    if (!isExist) {
      this.permissionRepo.insert({
        name: title,
        description: description,
      });
      return true;
    } else {
      return false;
    }
  }

  // async getUsersByPermission(permission: string): Promise<User[]> {
  //   debugger;
  //   const pms: any = await this.permissionRepo.findFirst({ name: permission });
  //   const r = await remult.repo(RolePermission).find({
  //     where: {
  //       permission: pms,
  //     },
  //   });

  //   // const u = this.userRepo
  //   const users = await this.userRepo.find({
       
  //       include: { // Still include for full user data if needed
  //           userRoles: {
  //               include: {
  //                   role: {
  //                       include: {
  //                           permissions: {
  //                               include: {
  //                                   permission: true,
  //                               },
  //                           },
  //                       },
  //                   },
  //               },
  //           },
  //       },

  //        where: {
  //           userRoles: {
                
  //               // role: {
  //               //     permissions: {
  //               //         permission: {
  //               //             name: permission // Filter by permission name here
  //               //         }
  //               //     }
  //               // }
                
  //           }
  //       },
  //   });

  //   return users;
  // }

  async getUsersByPermission(permissionName: string): Promise<User[]> {

    // First, find the permission entity
    const permissionEntity = await this.permissionRepo.findFirst({ name: permissionName });

    if (!permissionEntity) {
      console.warn(`Permission "${permissionName}" not found.`);
      return []; // Return empty array if permission doesn't exist
    }

    // Find all RolePermission entries that have this specific permission
    const rolePermissions = await this.rolePermissionRepo.find({
      where: {
        permission: permissionEntity,
      },
      include: {
        role: true // Include the associated role
      }
    });

    // Extract the IDs of roles that have this permission
    const roleIdsWithPermission = rolePermissions
      .map(rp => rp.role?.id)
      .filter((id): id is number => !!id); // Filter out undefined/null and ensure type

    if (roleIdsWithPermission.length === 0) {
      return []; // No roles have this permission
    }

    // Find UserRole entries where the role ID is one of the roles found above
    const userRolesWithPermission = await this.userRoleRepo.find({
      where: {
        role: { $id: { $in: roleIdsWithPermission } }, // Use $id and $in for filtering by related entity ID
      },
      include: {
        user: true, // Include the associated user
      },
    });

    // Extract unique users from the UserRole entries
    const usersWithPermission: User[] = [];
    const userIdsAdded = new Set<number>(); // To ensure unique users

    for (const ur of userRolesWithPermission) {
      if (ur.user && ur.user.id && !userIdsAdded.has(ur.user.id)) {
        usersWithPermission.push(ur.user);
        userIdsAdded.add(ur.user.id);
      }
    }
   
    return usersWithPermission;
  }

}
