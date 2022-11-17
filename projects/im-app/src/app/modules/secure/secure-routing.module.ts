import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, RoleGuard } from 'msal-lib';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { ClientComponent } from './Components/client/client.component';

const routes: Routes = [
  { path: 'dashboard', canActivate: [], component: DashboardComponent },
  { path: 'customer', canActivate: [AuthGuard], component: CustomerComponent },
  { path: 'client', canActivate: [AuthGuard], component: ClientComponent },


//  { path: 'manager', loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule) },
//  { path: 'installer', loadChildren: () => import('./modules/installer/installer.module').then(m => m.InstallerModule) },
//  { path: 'measurer', loadChildren: () => import('./modules/measurer/measurer.module').then(m => m.MeasurerModule) },
//  { path: 'staff', loadChildren: () => import('./modules/staff/staff.module').then(m => m.StaffModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
