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


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports:[
    InputGroupModule,
        InputGroupAddonModule,
        CardModule,
        Dialog,
        ToolbarModule,
        ButtonModule,
        InputTextModule,
        SplitButtonModule, IconFieldModule, InputIconModule,TableModule,

        AngularSvgIconModule, RouterLink
  ]
})
export class UserListComponent implements OnInit {

  constructor() { }

   users:User[]=[];
   userRepo = repo(User);
   showModal: boolean = false;


  ngOnInit() {
    this.getUsers();
  }

  async getUsers(){
    
    try {
    
        
        this.users = await this.userRepo.find({
          limit:10
        });
    
        } catch (error: any) {
          console.log(error);
          toast.error(error.message)
        }
    
  }

  showDialog(){
    this.showModal = true;
    console.log("sfsdfs");
    
  }

}
