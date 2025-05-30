import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TextareaModule } from 'primeng/textarea';
import { repo } from 'remult';

import { UserService } from '../../user.service';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { Roles } from '../../../../../shared/User.entity';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    CheckboxModule,
    ReactiveFormsModule,
    Dialog,
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
})
export class RolesComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
    this.formUpdate = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  roles: Roles[] = [];
  roleRepo = repo(Roles);
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedRole: Roles = <Roles>{};

  form!: FormGroup;
  formUpdate!: FormGroup;

  async ngOnInit() {
    await this.loadData();
  }

  onClick_Edit(role: Roles) {
    this.showUpdateModal = true;
    this.selectedRole = role;

    this.formUpdate.patchValue({
      name: this.selectedRole.name,
      description: this.selectedRole.description,
    });
  }

  onClick_RolePermission(roleId: number) {
    console.log(roleId);
    this.router.navigate(['user/role-permissions', roleId]);
  }

  async update() {
    try {
      await repo(Roles).update(this.selectedRole.id, {
        name: this.formUpdate.controls['name'].value,
        description: this.formUpdate.controls['description'].value,
      });
      this.loadData();
      toast.success('Successfully updated!');
      this.formUpdate.reset();
      this.showUpdateModal = false;
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async loadData() {
    try {
      this.roles = await this.userService.getRoles();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async save() {
    debugger
    if(this.form!.invalid){
      toast.error('Invalid!')
       return
    };

    try {
      await this.userService.createRole(
        this.form.value.name,
        this.form.value.description
      );

      this.form.reset();
      this.showModal = false;
      toast.success('Role Created successfully.');
      this.loadData();
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
    }
  }
}
