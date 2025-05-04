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
    // NgModel,
    CommonModule,
    // NftHeaderComponent,
    AngularSvgIconModule,
    // InputTextModule,ButtonModule
    
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule, IconFieldModule, InputIconModule,TableModule

    // NftDualCardComponent,
    // NftSingleCardComponent,
    // NftChartCardComponent,
    // NftAuctionsTableComponent,
  ],
  // providers:[AuthController]
})
export class NftComponent implements OnInit {
  // nft: Array<Nft>;
  
  
  taskRepo = remult.repo(Task);
  userRepo = remult.repo(User);
  tasks: Task[] = [];
  items:[]=[];
  users:User[]=[];

  constructor(
    
  ) {
    
    // this.nft = [
    //   {
    //     id: 34356771,
    //     title: 'Girls of the Cartoon Universe',
    //     creator: 'Jhon Doe',
    //     instant_price: 4.2,
    //     price: 187.47,
    //     ending_in: '06h 52m 47s',
    //     last_bid: 0.12,
    //     image: './assets/images/img-01.jpg',
    //     avatar: './assets/avatars/avt-01.jpg',
    //   },
    //   {
    //     id: 34356772,
    //     title: 'Pupaks',
    //     price: 548.79,
    //     last_bid: 0.35,
    //     image: './assets/images/img-02.jpg',
    //   },
    //   {
    //     id: 34356773,
    //     title: 'Seeing Green collection',
    //     price: 234.88,
    //     last_bid: 0.15,
    //     image: './assets/images/img-03.jpg',
    //   },
    // ];

    // this.taskRepo.find().then((items) => (this.tasks = items));
  }

  ngOnInit(): void {
    this.getTask();
  }

  async getTask() {
    try {

    this.tasks = await this.taskRepo.find();
    console.log('-----------------',this.tasks);
    this.users = await this.userRepo.find({
      limit:10
    });

    } catch (error: any) {
      console.log(error);
      
      
      toast.error(error.message)
    }
  }
}
