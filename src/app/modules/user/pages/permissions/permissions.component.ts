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
import { CheckboxModule } from 'primeng/checkbox';
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
import { Permission } from '../../../../../shared/User.entity';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    CheckboxModule,
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
export class PermissionsComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  permissions: Permission[] = [];
  permissionRepo = repo(Permission);
  showCreateModal: boolean = false;
  showUpdateModal: boolean = false;
  form!: FormGroup;
  formUpdate!: FormGroup;
  selectedPermission: Permission = <Permission>{};

  ngOnInit() {
    this.loadData();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
    this.formUpdate = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  onClick_Edit(permission: Permission) {
    this.showUpdateModal = true;
    this.selectedPermission = permission;
    console.log(this.selectedPermission);

    this.formUpdate.patchValue({
      name: this.selectedPermission.name,
      description: this.selectedPermission.description,
    });
  }

  async update() {
    try {
      await repo(Permission).update(this.selectedPermission.id, {
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
      this.userService.getPermissions().then(
        (permissions) => {
          this.permissions = permissions!;
          console.log('Fetched roles:', this.permissions);
        },
        (error) => {
          console.error('Error fetching roles in component:', error);
        }
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async save() {
    if (this.form.invalid) {
      toast.error('Invalid!');
      return;
    }

    try {
      
      await this.userService.createPermission(
        this.form.value.name,
        this.form.value.description
      );

      this.form.reset();
      this.showCreateModal = false;
      toast.success('Permission Created successfully.');
      this.loadData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}
