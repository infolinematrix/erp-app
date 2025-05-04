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
import { Permission, Roles } from 'src/shared/User.entity';
import { UserService } from '../../user.service';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  imports :[
    InputGroupModule,
        InputGroupAddonModule,
        CardModule,
        Dialog,
        ToolbarModule,
        ButtonModule,
        InputTextModule,
        SplitButtonModule, IconFieldModule, InputIconModule,TableModule,
        TextareaModule,
        AngularSvgIconModule, RouterLink,  ReactiveFormsModule
  ]
})
export class PermissionsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private userService:UserService,
    private router:Router,
  ) { }

  permissions:Permission[]=[];
  permissionRepo = repo(Permission);
  showCreateModal: boolean = false;

  form!: FormGroup;




  ngOnInit() {
    this.loadData();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  async loadData(){
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
      toast.error(error.message)
    }
  }

  save(){}

}
