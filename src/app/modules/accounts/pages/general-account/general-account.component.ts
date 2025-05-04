import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountsService } from '../../accounts.service';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-general-account',
  templateUrl: './general-account.component.html',
  styleUrls: ['./general-account.component.css'],
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
export class GeneralAccountComponent implements OnInit {

  constructor(
    private accountsService: AccountsService,
    // private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  accounts: any[] = [];
  showCreateModal: boolean = false;
  form!:FormGroup


  ngOnInit() {
    this.loadData();

    this.form = new FormGroup({})
  }

  async loadData(){
    this.accounts = await this.accountsService.getAccounts();
  }

  async save(){

    this.showCreateModal=false;
    this.loadData();

  }
}
