import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RandrLibModule } from 'randr-lib';
import { MatLibModule } from 'mat-lib';

import { AdminRoutingModule } from './admin-routing.module';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { JobService } from './services/job.service';
import { BidSheetComponent } from './components/bid-sheet/bid-sheet.component';
import { MeasureComponent } from './components/measure/measure.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
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
    WorkOderService
  ]
})
export class AdminModule { }
