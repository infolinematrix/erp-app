
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';

import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css'],
  imports: [
    SidebarComponent,
    InputGroupModule,
    PanelModule,
    TreeModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    TextareaModule,
    AngularSvgIconModule,
    ReactiveFormsModule
],
})
export class AccountDashboardComponent implements OnInit {
  constructor() {}
  nodes!: TreeNode[];
  ngOnInit() {
    this.nodes = [
      {
        key: '0',
        label: 'Voucher Entry',
        children: [
          {
            key: '0-0',
            label: 'Cash Receipt',
            data: '/accounts/cash-receive-entry',
            type: 'url',
          },
          {
            key: '0-1',
            label: 'Cash Payment',
            data: '/accounts/cash-payment-entry',
            type: 'url',
          },
          {
            key: '0-2',
            label: 'Transfer Entry',
            data: '/accounts/transfer-entry',
            type: 'url',
          },
          {
            key: '0-3',
            label: 'Take a Look',
            data: 'https://angular.io/start',
            type: 'url',
          },
        ],
      },
      {
        key: '1',
        label: 'Components In-Depth',
        children: [
          {
            key: '1-0',
            label: 'Component Registration',
            data: 'https://angular.io/guide/component-interaction',
            type: 'url',
          },
          {
            key: '1-1',
            label: 'User Input',
            data: 'https://angular.io/guide/user-input',
            type: 'url',
          },
          {
            key: '1-2',
            label: 'Hooks',
            data: 'https://angular.io/guide/lifecycle-hooks',
            type: 'url',
          },
          {
            key: '1-3',
            label: 'Attribute Directives',
            data: 'https://angular.io/guide/attribute-directives',
            type: 'url',
          },
        ],
      },
    ];
  }
}
