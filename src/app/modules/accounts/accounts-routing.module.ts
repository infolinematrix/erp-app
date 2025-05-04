import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDashboardComponent } from './pages/account-dashboard/account-dashboard.component';
import { GeneralLedgerComponent } from './pages/general-ledger/general-ledger.component';
import { GeneralAccountComponent } from './pages/general-account/general-account.component';
import { StatementComponent } from './pages/statement/statement.component';
import { CashReceiveEntryComponent } from './pages/cash-receive-entry/cash-receive-entry.component';
import { CashPaymentEntryComponent } from './pages/cash-payment-entry/cash-payment-entry.component';
import { TransferEntryComponent } from './pages/transfer-entry/transfer-entry.component';

// const routes: Routes = [
//     // canActivate: [AuthGuard],
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   {
//     path: 'dashboard',
//     component: AccountDashboardComponent,
//   },
//   {
//     path: 'general-ledger',
//     component: GeneralLedgerComponent,
//   },
//   // {
//   //   path: 'general-account',
//   //   component: GeneralAccountComponent,
//   // },


// ];
const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: AccountDashboardComponent,
      },
      {
        path: 'general-ledgers', children: [
          { path: '', component: GeneralLedgerComponent, pathMatch: 'full' },
          // { path: 'create', component: CreateComponent },
        ]
      },
      {
        path: 'general-accounts', children: [
          { path: '', component: GeneralAccountComponent, pathMatch: 'full' },
          // { path: 'create', component: CreateComponent },
        ]
      },
      {
        path: 'statement-of-accounts',
        component: StatementComponent,
      },

      //---Transactions
      {
        path: 'cash-receive-entry',
        component: CashReceiveEntryComponent,
      },
      {
        path: 'cash-payment-entry',
        component: CashPaymentEntryComponent,
      },
      {
        path: 'transfer-entry',
        component: TransferEntryComponent,
      },
      
     
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
