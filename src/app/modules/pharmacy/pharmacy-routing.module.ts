import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyDashboardComponent } from './pages/pharmacy-dashboard/pharmacy-dashboard.component';
import { PharmacySettingsComponent } from './pages/pharmacy-settings/pharmacy-settings.component';
import { PharmacyInventoryComponent } from './pages/pharmacy-inventory/pharmacy-inventory.component';
import { PharmacyBillingComponent } from './pages/pharmacy-billing/pharmacy-billing.component';


const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard], // Protect the parent route
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PharmacyDashboardComponent },
      { path: 'settings', component: PharmacySettingsComponent },
      { path: 'inventory', component: PharmacyInventoryComponent },
      { path: 'billing', component: PharmacyBillingComponent },


      

      //------Last
      { path: '**', redirectTo: 'errors/404' },
      

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmacyRoutingModule { }
