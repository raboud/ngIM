import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatLibModule } from 'mat-lib';
import { RandrLibModule } from 'randr-lib';

import { MeasurerRoutingModule } from './measurer-routing.module';
import { MyMeasuresComponent } from './components/my-measures/my-measures.component';

@NgModule({
  declarations: [
    MyMeasuresComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RandrLibModule,
    MatLibModule,
    MeasurerRoutingModule
  ],
  providers:[
  ]
})
export class MeasurerModule { }
