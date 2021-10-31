import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { MsalGuard } from '@azure/msal-angular';
import { AuthGuard } from 'msal-lib';

const routes: Routes = [
  { path: 'dashboard', canActivate: [], component: DashboardComponent },
  { path: 'customer', canActivate: [AuthGuard], component: CustomerComponent },
//  { path: 'client', canActivate: [AuthGuard], component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
