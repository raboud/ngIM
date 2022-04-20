import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirtyCheckGuard } from 'randr-lib';

import { MeasureDetailComponent } from '../measure/components/measure-detail/measure-detail.component';
import { MeasureListComponent } from '../measure/components/measure-list/measure-list.component';
import { MeasureComponent } from './components/measure/measure.component';


const routes: Routes = [

  { path: 'measures', component: MeasureListComponent},
  { path: 'measure/:JobId', component: MeasureComponent },

//  { path: 'measure/edit/:id', component: MeasureEditComponent };
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasureRoutingModule { }
