import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectModule } from 'primeng/select';
import { remult, repo } from 'remult';
import { Roles, User, UserRole } from '../../../../../shared/User.entity';
import { AngularSvgIconModule, SvgIconComponent } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { Dialog } from 'primeng/dialog';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import bcrypt from 'bcryptjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    CardModule,
    FormsModule,
    CommonModule,
    Dialog,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    RouterLink,
  ],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userRepo = repo(User);
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  showRoleModal: boolean = false;
  createForm!: FormGroup;
  updateForm!: FormGroup;
  showPassword: boolean = false;
  userStatus: any[] = [
    { value: 'yes', label: 'Active' },
    { value: 'no', label: 'Inactive' },
  ];

  userTypes: any[] = [];
  userRoles: UserRole[] = [];
  selectedRole: Roles | null = null;
  selectedUser: User | null = null;
  roles: Roles[] = [];

  constructor(private fromBuilder: FormBuilder) {
    this.createForm = this.fromBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
      status: ['yes', [Validators.required]],
    });

    this.updateForm = this.fromBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      user_type: ['', [Validators.required]],
      status: ['yes', [Validators.required]],
    });

    this.userTypes = [
      { value: 'USER', label: 'User' },
      { value: 'EMPLOYEE', label: 'Employee' },
    ];
  }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      this.users = await this.userRepo.find({
        limit: 50,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async getAllRoles() {
    try {
      this.roles = await remult.repo(Roles).find();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  showDialog() {
    this.showModal = true;
  }

  onClick_Edit(user: User) {
    this.showUpdateModal = true;
    const userData = user;
    this.updateForm.patchValue({
      id: userData.id,
      name: userData.name,
      email: userData.username,
      user_type: userData.user_type,
      status: userData.is_active,
    });
  }

  async updateUser() {
    if (!this.updateForm.valid) {
      toast.error('Update faild!');
      return;
    }
    try {
      await remult.repo(User).update(
        { id: this.updateForm.value.id },
        {
          name: this.updateForm.value.name,
          username: this.updateForm.value.email,
          user_type: this.updateForm.value.user_type,
          is_active: this.updateForm.value.status,
        }
      );

      this.updateForm.reset();
      this.showUpdateModal = false;
      this.getUsers();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async onClick_Role(user: User) {
    this.showRoleModal = true;
    this.getAllRoles();
    this.selectedUser = user;

    try {
      this.userRoles = await remult.repo(UserRole).find({
        where: {
          user: user,
        },
        include: { role: true },
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async appendRoleToUser() {
    if (this.selectedRole && this.selectedUser) {
      try {
        this.userRoles.push({
          role: this.selectedRole,
          user: this.selectedUser,
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }

  async deleteUserRole(roleId: number) {
    this.userRoles = this.userRoles.filter((ur) => ur.role?.id !== roleId);
  }

  async updateUserRoles() {
    try {

      // this.userRoles.map(async (ur) => {
      //   await remult.repo(UserRole).delete({user: ur.user!});
      // });

      // await remult.repo(UserRole).deleteMany({ user: this.selectedUser! });

      const existingRoles = await remult.repo(UserRole).find({
        where: {
          user: this.selectedUser!,
        },
      });

      for (const ur of existingRoles) {
        await remult.repo(UserRole).delete(ur.id!);
      }

      const newRoles = this.userRoles.map((ur) =>
        remult.repo(UserRole).create({
          user: this.selectedUser!,
          role: ur.role!,
        })
      );

      if (newRoles.length > 0) {
        await remult.repo(UserRole).insert(newRoles);
      }
      
      this.selectedRole = null;
      this.userRoles = [];
      this.showRoleModal = false;
      toast.success('Roles updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async createUser() {
    if (!this.createForm.valid) {
      toast.error('Create faild!');
      return;
    }

    try {
      //--
      await remult.repo(User).insert({
        center_code: 'MAIN',
        name: this.createForm.value.name,
        username: this.createForm.value.email,
        password: await bcrypt.hash(this.createForm.value.password, 10),
        user_type: this.createForm.value.user_type,
      });
      this.createForm.reset();
      this.showModal = false;
      this.getUsers();

      // await this.userRepo.insert(user);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
