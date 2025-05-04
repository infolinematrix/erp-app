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
import { repo, Validators } from 'remult';
import { Roles } from 'src/shared/User.entity';
import { UserService } from '../../user.service';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  imports:[
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
export class RolesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private userService:UserService,
    private router:Router,
  ) { }

  roles:Roles[]=[];
  roleRepo = repo(Roles);
  showModal: boolean = false;

  form!: FormGroup;




  ngOnInit() {
    this.loadData();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', []],
    });
  }

  async loadData(){
    try {
      
      this.userService.getRoles().then(
        (roles) => {
          this.roles = roles!;
          console.log('Fetched roles:', this.roles);
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

  async save(){
    try {
      console.log("FOrm Data", this.form.value);
      await this.userService.createRole(this.form.value.name, this.form.value.description).then(
        (resp) => {
          toast.success('Success');
          console.log('Fetched roles:', resp);

        },
        (error) => {
          toast.error(error.message);
          console.error('Error fetching roles in component:', error);
        }
      );

      this.showModal = false;
      // this.loadData();
      
    } catch (error: any) {
      console.log(error);
      toast.error(error.message)
    }

  }
}
