import { Component, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
// import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
// import { NftChartCardComponent } from '../../components/nft/nft-chart-card/nft-chart-card.component';
// import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
// import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { remult } from 'remult';

import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { Task } from '../../../../../shared/Task.entity';
import { User } from '../../../../../shared/User.entity';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',

  imports: [
    CommonModule,
    AngularSvgIconModule,
  ],
})
export class NftComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
   
  }
}
