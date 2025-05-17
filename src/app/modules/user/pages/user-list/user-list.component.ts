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
import { remult, repo } from 'remult';
import { User } from '../../../../../shared/User.entity';
import { AngularSvgIconModule, SvgIconComponent } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { Dialog } from 'primeng/dialog';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    Dialog,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,

    AngularSvgIconModule,
    RouterLink,
  ],
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userRepo = repo(User);
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  form!: FormGroup;


  constructor(
    private readonly formBuilder: FormBuilder,
    
  ) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
    });


  }

  

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      this.users = await this.userRepo.find({
        limit: 10,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  showDialog() {
    this.showModal = true;
    console.log('sfsdfs');
  }

  onClick_Edit() {
    this.showUpdateModal = true;
  }

  async createUser(){
    if (!this.form.valid) {
      toast.error("Create faild!")
      return;
    }
    debugger;
    try {
      //--
    let user = new User();
    user.name = this.form.value.name;
    user.username = this.form.value.email;
    user.password = this.form.value.password;
    user.user_type = this.form.value.user_type;
    //--

    // await this.userRepo.insert(user);
    } catch (error:any) {
      toast.error(error.message);
    }

  }
}
