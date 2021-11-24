import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { JobListComponent } from './components/job-list/job-list.component';

const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'jobs/edit/:id', component: JobEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
