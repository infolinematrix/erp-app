import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsService } from './accounts.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ],
  providers:[AccountsService]
})
export class AccountsModule { }
