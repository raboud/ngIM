import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurerRoutingModule } from './measurer-routing.module';
import { MyMeasuresComponent } from './components/my-measures/my-measures.component';
import { MeasureComponent } from './components/measure/measure.component';


@NgModule({
  declarations: [

    MyMeasuresComponent,
    MeasureComponent
  ],
  imports: [
    CommonModule,
    MeasurerRoutingModule
  ]
})
export class MeasurerModule { }
