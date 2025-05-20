import { Injectable } from '@angular/core';
import { repo } from 'remult';
import { Observable } from 'rxjs';
import { Permission, Roles } from '../../../shared/User.entity';


@Injectable({
  providedIn: 'root'
})
export class UserService {

roleRepo = repo(Roles);
permissionRepo = repo(Permission);

  constructor() { }


  async getRoles():Promise<Roles[]> {
    const data = await this.roleRepo.find();
    return data;
  }

  async getPermissions():Promise<Permission[]> {
    const data = await this.permissionRepo.find();
    return data;
  }

  async createRole(title:string,description:string){
    const isExist = await this.roleRepo.findFirst({name:title});

    if(!isExist){
      this.roleRepo.create({
        name:title,
        // slug: ,
        is_active: true,
        is_system: false,
        is_superadmin: false,
        created_at: new Date()
      })
      return true;
    }else{
      return false;
    }
    
  }

}
