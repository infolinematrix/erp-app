import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule, UserRoutingModule, 
  ],
  providers:[UserService]
  
})
export class UserModule { }
