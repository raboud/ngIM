import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatLibModule } from 'mat-lib';
import { RandrLibModule } from 'randr-lib';

import { MeasureComponent } from './components/measure/measure.component';
import { MeasureDetailComponent } from './components/measure-detail/measure-detail.component';
import { MeasureItemEditComponent } from './components/measure-item-edit/measure-item-edit.component';
import { MeasureListComponent } from './components/measure-list/measure-list.component';
import { MeasureService } from './services/measure.service';
import { RouterModule } from '@angular/router';
import { MeasureRoomEditComponent } from './components/measure-room-edit/measure-room-edit.component';
import { MeasureRoutingModule } from './measure-routing.module';
import { SahredModule } from '../shared/shared.module';

@NgModule({
  declarations: [

    MeasureComponent,
    MeasureDetailComponent,
    MeasureItemEditComponent,
    MeasureListComponent,
    MeasureRoomEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    RandrLibModule,
    MatLibModule,
    SahredModule,

    MeasureRoutingModule

  ],
  exports:[
    MeasureComponent,
    MeasureDetailComponent,
    MeasureItemEditComponent,
    MeasureListComponent,
  ],
  providers:[
    MeasureService,
  ]
})
export class MeasureModule { }
