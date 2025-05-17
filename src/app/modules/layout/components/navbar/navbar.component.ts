import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        AngularSvgIconModule,
        NavbarMenuComponent,
        ProfileMenuComponent,
        NavbarMobileComponent,
        MenubarModule,
        CommonModule,
        SelectModule
    ],
    providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  constructor(private menuService: MenuService) {}
  centers: any[] = [];
  
  ngOnInit(): void {
    this.centers = [
      { name: 'Main Center', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }

  

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
