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
import { JobService } from './services/job.service';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { BidSheetComponent } from './components/bid/bid-sheet/bid-sheet.component';
import { BidItemEditComponent } from './components/bid/bid-item-edit/bid-item-edit.component';
import { MeasureComponent } from './components/measure/measure-detail/measure.component';
import { MeasureItemEditComponent } from './components/measure/measure-item-edit/measure-item-edit.component';
import { AdminMenuComponent } from './components/menu/admin-menu.component';

import { BidSheetService } from './services/bid-sheet.service';
import { MeasureService } from './services/measure.service';
import { WorkOderService } from './services/work-oder.service';

@NgModule({
  declarations: [
    JobListComponent,
    JobDetailComponent,
    JobEditComponent,
    BidSheetComponent,
    MeasureComponent,
    WorkOrderComponent,
    BidItemEditComponent,
    MeasureItemEditComponent,
    AdminMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RandrLibModule,
    MatLibModule,

    AdminRoutingModule
  ],
  providers:[
    JobService,
    BidSheetService,
    MeasureService,
    WorkOderService,
    CurrencyPipe
  ]
})
export class AdminModule { }
