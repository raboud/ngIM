import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirtyCheckGuard } from 'randr-lib';
import { MeasureDetailComponent } from '../measure/components/measure-detail/measure-detail.component';
import { MeasureListComponent } from '../measure/components/measure-list/measure-list.component';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/:id', component: JobListComponent },
  { path: 'job/:id', component: JobDetailComponent },
  { path: 'users', component: UserListComponent },



//  { path: 'measure/edit/:id', component: MeasureEditComponent };
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
