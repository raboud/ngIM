import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RandrLibModule } from 'randr-lib';
import { MatLibModule } from 'mat-lib';

import { AdminRoutingModule } from './admin-routing.module';

import { JobListComponent } from './components/job/job-list/job-list.component';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import { JobEditComponent } from './components/job/job-edit/job-edit.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { BidSheetComponent } from './components/bid/bid-sheet/bid-sheet.component';
import { BidItemEditComponent } from './components/bid/bid-item-edit/bid-item-edit.component';
import { AdminMenuComponent } from './components/menu/admin-menu.component';

import { UserListComponent } from './components/user/user-list/user-list.component';


import { BidSheetService } from './services/bid-sheet.service';
import { WorkOderService } from './services/work-oder.service';
import { JobService } from './services/job.service';
import { UserService } from './services/user.service ';
import { MeasureModule } from '../measure/measure.module';

@NgModule({
  declarations: [
    JobListComponent,
    JobDetailComponent,
    JobEditComponent,
    BidSheetComponent,
    WorkOrderComponent,
    BidItemEditComponent,

    AdminMenuComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RandrLibModule,
    MatLibModule,
    MeasureModule,

    AdminRoutingModule
  ],
  providers:[
    JobService,
    BidSheetService,
    WorkOderService,
    UserService,
    CurrencyPipe
  ]
})
export class AdminModule { }
