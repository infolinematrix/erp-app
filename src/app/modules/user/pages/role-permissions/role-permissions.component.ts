import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { Modules } from '../../../../core/constants/modules';
import { toast } from 'ngx-sonner';
import { remult } from 'remult';
import { Permission, RolePermission, Roles } from '../../../../../shared/User.entity';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-permissions',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    CheckboxModule,
    SelectModule,
    TabsModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    TextareaModule,
    AngularSvgIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.css',
})
export class RolePermissionsComponent implements OnInit {
  roleId!: number;
  role: any = Roles;
  permissions: Permission[] = [];
  selectedPermission: Permission | null = null;
  addedPermissions: Permission[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.roleId = Number(this.route.snapshot.paramMap.get('roleId'))!;
    
    this.loadPermissions();
    this.loadRolePermissions();
  }

  deletePermission(permission: any) {
    
    const index = this.addedPermissions.indexOf(permission);
    if (index > -1) {
      this.addedPermissions.splice(index, 1);
    }
  }

  async loadPermissions() {
    try {
      const data = await remult.repo(Permission).find();
      this.permissions = data;
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async loadRolePermissions() {
     
     this.role = await remult.repo(Roles).findId(this.roleId);
    try {
      const data = await remult.repo(RolePermission).find(
        {
          where:{role: this.role.id},
          include:{permission:true}
        }
      );
     
      for (const item of data) {
      
        const p = item.permission;
        this.addedPermissions.push(p)
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  onSelectPermission() {
    this.selectedPermission = null;
  }

  appendPermission() {
    this.addedPermissions.push(this.selectedPermission!);
    this.selectedPermission = null;
  }

  async save() {
    try {
      //--delete existing first
      await remult.repo(RolePermission).deleteMany({
        where: { role: this.role },
      });
      // Insert new permissions
      for (const permission of this.addedPermissions) {
        const record = remult.repo(RolePermission).create({
          role: this.role!,
          permission: permission!,
        });
        await remult.repo(RolePermission).save([record]);
      }

       toast.success("Permissions saved successfully.");

    } catch (error: any) {
      toast.error(error.message);
    }
  }
}
