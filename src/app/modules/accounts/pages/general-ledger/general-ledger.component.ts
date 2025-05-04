import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../accounts.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from 'express';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
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
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { DatePickerModule } from 'primeng/datepicker';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css'],
  imports:[
    RouterLink, DatePipe,
    InputGroupModule,
        InputGroupAddonModule, DatePickerModule,CheckboxModule,
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
export class GeneralLedgerComponent implements OnInit {

  constructor(
    private accountsService: AccountsService,
    // private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ledgers: any[] = [];
  showCreateModal: boolean = false;
  form!:FormGroup

  ngOnInit() {
    this.loadData();
    this.form = new FormGroup({})
  }

  async loadData(){
    this.ledgers = await this.accountsService.getLedgers();
  }

  async save(){
    this.showCreateModal=false;
    this.loadData();
  }

}
