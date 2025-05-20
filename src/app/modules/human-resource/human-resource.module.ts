import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourceRoutingModule } from './human-resource-routing.module';
import { HoumanResourceService } from './services/houman-resource.service';
import { EmployeeService } from './services/employee.service';
import { PickupService } from '../../core/services/pickup.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HumanResourceRoutingModule
  ],
  providers:[
    HoumanResourceService,
    EmployeeService,
    PickupService
  ]
})
export class HumanResourceModule { }
