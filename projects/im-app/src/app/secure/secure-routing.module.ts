import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: 'dashboard', canActivate: [MsalGuard], component: DashboardComponent },
  { path: 'customer', canActivate: [MsalGuard], component: CustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
