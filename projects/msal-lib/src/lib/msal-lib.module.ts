import { NgModule } from '@angular/core';
import { MsalLibComponent } from './msal-lib.component';

import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RandrLibModule } from 'randr-lib';
import { CommonModule } from '@angular/common';
import { MatLibModule } from 'mat-lib';

@NgModule({
  declarations: [MsalLibComponent],
  imports: [
    CommonModule,
    RandrLibModule,
    MsalModule,
    MatLibModule
  ],
  exports: [
    MsalLibComponent,
  ]
  ,
  providers:  [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  MsalService
  ]
})
export class MsalLibModule { }
