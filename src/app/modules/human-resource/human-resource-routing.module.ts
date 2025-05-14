import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { UpdateEmployeeComponent } from './pages/employee/update-employee/update-employee.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'employee',
        children: [
          { path: '', component: EmployeeComponent },
          { path: 'update/:id', component: UpdateEmployeeComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumanResourceRoutingModule {}
