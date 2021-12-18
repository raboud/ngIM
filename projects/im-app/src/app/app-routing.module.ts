import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'msal-lib';
import { AddressFormComponent } from './Components/address-form/address-form.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: 'secure', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./modules/secure/secure.module').then(m => m.SecureModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'manager', loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule) },
  { path: 'installer', loadChildren: () => import('./modules/installer/installer.module').then(m => m.InstallerModule) },
  { path: 'measurer', loadChildren: () => import('./modules/measurer/measurer.module').then(m => m.MeasurerModule) },
  { path: 'staff', loadChildren: () => import('./modules/staff/staff.module').then(m => m.StaffModule) },

  //  { path: 'login', component: LoginComponent },
  { path: 'address', component: AddressFormComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
