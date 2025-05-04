import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountsService } from '../../accounts.service';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css'],
  imports:[
    RouterLink, DatePipe,
    InputGroupModule, SelectModule, DatePickerModule,
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
export class StatementComponent implements OnInit {

  constructor(
    private accountsService: AccountsService,
    // private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ledgers: any[] = [];
  accounts: any[] = [];

  selectedLedger: any;
  selectedAccount: any;

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    this.ledgers = await this.accountsService.getLedgers();
    
  }

}
