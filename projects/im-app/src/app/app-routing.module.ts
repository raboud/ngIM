import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: '',  canActivate: [MsalGuard], children: [
    { path: 'secure', loadChildren: () => import('./Secure/secure.module').then(m => m.SecureModule) },
    // { path: 'messages', loadChildren: () => import('./Modules/Messages/messages.module').then(m => m.MessagesModule) },
    // { path: 'patients', loadChildren: () => import('./Modules/Patients/patients.module').then(m => m.PatientsModule) },
    // { path: 'providers', loadChildren: () => import('./Modules/Providers/providers.module').then(m => m.ProvidersModule) },
    // { path: 'reports', loadChildren: () => import('./Modules/Reports/reports.module').then(m => m.ReportsModule) },
    // { path: 'settings', loadChildren: () => import('./Modules/Settings/settings.module').then(m => m.SettingsModule) },
    // { path: 'dashboard', component: DashboardComponent },
  ]},

//  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
