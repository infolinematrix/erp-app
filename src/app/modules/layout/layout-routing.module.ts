import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  //---Pharmacy
  { path: '', redirectTo: 'pharmacy', pathMatch: 'full' },
  {
    path: 'pharmacy',
    component: LayoutComponent,
    loadChildren: () =>
      import('../pharmacy/pharmacy.module').then((m) => m.PharmacyModule),
  },

  //---Human Resource
  { path: '', redirectTo: 'human-resource', pathMatch: 'full' },
  {
    path: 'human-resource',
    component: LayoutComponent,
    loadChildren: () =>
      import('../human-resource/human-resource.module').then((m) => m.HumanResourceModule),
  },

  //---Accounts
  {
    path: 'accounts',
    component: LayoutComponent,
    loadChildren: () =>
      import('../accounts/accounts.module').then((m) => m.AccountsModule),
  },

  {
    path: 'user',
    component: LayoutComponent,
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },

  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
