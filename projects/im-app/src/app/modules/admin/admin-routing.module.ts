import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import { JobEditComponent } from './components/job/job-edit/job-edit.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { MeasureDetailComponent } from './components/measure/measure-detail/measure-detail.component';
import { MeasureListComponent } from './components/measure/measure-list/measure-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'jobs/edit/:id', component: JobEditComponent },
  { path: 'measures', component: MeasureListComponent},
  { path: 'measures/:id', component: MeasureDetailComponent },
  { path: 'users', component: UserListComponent },
//  { path: 'measure/edit/:id', component: MeasureEditComponent };
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
