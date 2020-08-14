import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';

import { SecureRoutingModule } from './secure-routing.module';
import { CustomerComponent } from './Components/customer/customer.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RandrLibModule } from 'randr-lib';
import { MatLibModule } from 'mat-lib';
import { MsalConfigModule } from '../msal-config/msal-config.module';

@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RandrLibModule,
    MatLibModule,
    SecureRoutingModule,
    MsalConfigModule,

    HttpClientModule
  ],
  providers: [
    CustomerService
  ]
})
export class SecureModule { }
