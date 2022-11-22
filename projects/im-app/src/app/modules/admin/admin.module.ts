import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RandrLibModule } from 'randr-lib';
import { MatLibModule } from 'mat-lib';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMenuComponent } from './components/menu/admin-menu.component';
import { BidAreaEditComponent } from './components/bid/bid-area-edit/bid-area-edit.component';
import { BidItemEditComponent } from './components/bid/bid-item-edit/bid-item-edit.component';
import { BidSheetComponent } from './components/bid/bid-sheet/bid-sheet.component';
import { BidSheetsComponent } from './components/bid/bid-sheets/bid-sheets.component';
import { ImagesComponent } from './components/images/images/images.component';
import { ImagesContainerComponent } from './components/images/image-container/images-container.component';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { LogComponent } from './components/log/log.component';
import { SummaryComponent } from './components/summary/summary/summary.component';
import { SummaryAreaEditComponent } from './components/summary/summary-area-edit/summary-area-edit.component';
import { SummaryItemEditComponent } from './components/summary/summary-item-edit/summary-item-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';


import { BidSheetService } from './services/bid-sheet.service';
import { UserService } from './services/user.service ';
import { WorkOderService } from './services/work-oder.service';

import { MeasureModule } from '../measure/measure.module';
import { SahredModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminMenuComponent,
    BidAreaEditComponent,
    BidItemEditComponent,
    BidSheetComponent,
    BidSheetsComponent,
    ImagesComponent,
    ImagesContainerComponent,
    JobDetailComponent,
    JobListComponent,
    LogComponent,
    SummaryComponent,
    SummaryAreaEditComponent,
    SummaryItemEditComponent,
    UserListComponent,
    WorkOrderComponent,
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
