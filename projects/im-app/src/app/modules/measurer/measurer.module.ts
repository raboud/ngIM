import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatLibModule } from 'mat-lib';
import { RandrLibModule } from 'randr-lib';

import { MeasurerRoutingModule } from './measurer-routing.module';
import { MyMeasuresComponent } from './components/my-measures/my-measures.component';
import { MeasureComponent } from './components/measure/measure.component';
import { MeasureDetailComponent } from './components/measure-detail/measure-detail.component';
import { MeasureItemEditComponent } from './components/measure-item-edit/measure-item-edit.component';
import { MeasureListComponent } from './components/measure-list/measure-list.component';
import { MeasureService } from './services/measure.service';

@NgModule({
  declarations: [

    MyMeasuresComponent,
    MeasureComponent,
    MeasureDetailComponent,
    MeasureItemEditComponent,
    MeasureListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RandrLibModule,
    MatLibModule,

    MeasurerRoutingModule
  ],
  providers:[
    MeasureService,
  ]
})
export class MeasurerModule { }
