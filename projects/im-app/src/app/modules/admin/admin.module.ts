import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RandrLibModule } from 'randr-lib';
import { MatLibModule } from 'mat-lib';

import { AdminRoutingModule } from './admin-routing.module';

import { JobListComponent } from './components/job/job-list/job-list.component';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { BidSheetComponent } from './components/bid/bid-sheet/bid-sheet.component';
import { BidItemEditComponent } from './components/bid/bid-item-edit/bid-item-edit.component';
import { AdminMenuComponent } from './components/menu/admin-menu.component';

import { UserListComponent } from './components/user/user-list/user-list.component';


import { BidSheetService } from './services/bid-sheet.service';
import { WorkOderService } from './services/work-oder.service';
import { UserService } from './services/user.service ';
import { MeasureModule } from '../measure/measure.module';
import { BidAreaEditComponent } from './components/bid/bid-area-edit/bid-area-edit.component';
import { SahredModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    JobListComponent,
    JobDetailComponent,
    BidSheetComponent,
    WorkOrderComponent,
    BidItemEditComponent,
    AdminMenuComponent,
    UserListComponent,
    BidAreaEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RandrLibModule,
    MatLibModule,
    MeasureModule,
    SahredModule,

    AdminRoutingModule
  ],
  providers:[
    BidSheetService,
    WorkOderService,
    UserService,
    CurrencyPipe
  ]
})
export class AdminModule { }
