import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
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
import { TabsModule } from "primeng/tabs";
import { Modules } from 'src/app/core/constants/modules';

@Component({
  selector: 'app-role-permissions',
  imports: [
    InputGroupModule,
        InputGroupAddonModule,
        CardModule,CheckboxModule,
        // Dialog, 
        TabsModule,
        ToolbarModule,
        ButtonModule,
        InputTextModule,
        SplitButtonModule, IconFieldModule, InputIconModule,TableModule,
        TextareaModule,
        AngularSvgIconModule, RouterLink,  ReactiveFormsModule,
  ],
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.css'
})
export class RolePermissionsComponent implements OnInit {
  scrollableTabs: any[] = []
  ngOnInit(): void {
    // this.scrollableTabs = [
    //   {value: 0, title: 'Tab1', content: 'asdasd' },
    // ];

    this.scrollableTabs = [
      { title: 'Global Settings', value: Modules.GlobalSettings},
      { title: 'Users', value: Modules.UserModule},
      { title: 'Accounts', value: Modules.AccountModule},
      { title: 'Inventory', value: Modules.InvenoryModule},
      { title: 'HRMS', value: Modules.HRMSModule},
      { title: 'CRM', value: Modules.CRMModule},
    ];

    
  }

}
