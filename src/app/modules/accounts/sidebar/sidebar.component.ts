import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [
    RouterLink,
    DatePipe,
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
    ReactiveFormsModule,
  ],
})
export class SidebarComponent implements OnInit {

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
          label: 'Voucher Management',
          children: [
            {
              key: '1-0',
              label: 'Voucher View',
              data: '/accounts/voucher-view',
              type: 'url',
            },
            // {
            //   key: '1-1',
            //   label: 'Voucher Authorisation',
            //   data: '/accounts/transfer-entry',
            //   type: 'url',
            // },
            // {
            //   key: '1-2',
            //   label: 'Vaoucher Cancellation',
            //   data: '/accounts/transfer-entry',
            //   type: 'url',
            // },
            
          ],
        },
      ];
    }

}
