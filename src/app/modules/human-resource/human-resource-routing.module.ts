import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { UpdateEmployeeComponent } from './pages/employee/update-employee/update-employee.component';
import { EmployeeSalaryComponent } from './pages/employee/employee-salary/employee-salary.component';
import { EmployeePayrollComponent } from './pages/employee/employee-payroll/employee-payroll.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'employee',
        children: [
          { path: '', component: EmployeeComponent },
          { path: 'update/:id', component: UpdateEmployeeComponent },
          { path: 'salary', component: EmployeeSalaryComponent },
        ],
      },
      {
        path: 'employee/payroll',
        children: [
          { path: '', component: EmployeeComponent },
          { path: 'update/:id', component: EmployeePayrollComponent },
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
