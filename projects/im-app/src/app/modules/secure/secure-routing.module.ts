import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, RoleGuard } from 'msal-lib';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CustomerComponent } from './Components/customer/customer.component';

const routes: Routes = [
  { path: 'dashboard', canActivate: [], component: DashboardComponent },
  { path: 'customer', canActivate: [AuthGuard], component: CustomerComponent },
  {
    path: 'admin',
    canActivate: [RoleGuard],
    canLoad: [RoleGuard],
    data: {
      expectedRole: "Admin"
    } ,
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
