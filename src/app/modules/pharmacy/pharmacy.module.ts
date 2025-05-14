import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyService } from './services/pharmacy.service';
import { PharmacyConfigService } from './services/pharmacy-config.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
  ],
  providers:[PharmacyService, PharmacyConfigService]

})

export class PharmacyModule { }
