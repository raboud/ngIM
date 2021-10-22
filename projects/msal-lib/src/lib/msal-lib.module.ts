import { NgModule } from '@angular/core';
import { LoginSubMenuComponent } from './login-sub-menu.component';

//import { environment } from '../../../im-app/src/environments/environment';

import { RandrLibModule } from 'randr-lib';
import { CommonModule } from '@angular/common';
import { MatLibModule } from 'mat-lib';

import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RoleGuard } from './role.guard';



@NgModule({
  declarations: [LoginSubMenuComponent],
  imports: [
    CommonModule,
    RandrLibModule,
    MsalModule,
    MatLibModule,
    MsalModule,
  ],
  exports: [
    LoginSubMenuComponent,
  ]
  ,
  providers: [
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    AuthGuard,
    AuthService,
    RoleGuard
  ]
})
export class MsalLibModule { }
