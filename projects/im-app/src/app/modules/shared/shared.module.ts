import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RandrLibModule } from 'randr-lib';
import { MatLibModule } from 'mat-lib';
import { JobHeaderComponent } from './components/job-header/job-header.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { JobService } from './services/job.service';


@NgModule({
  declarations: [

    JobHeaderComponent,
    JobEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RandrLibModule,
    MatLibModule,

   ],
  providers:[
    JobService
  ],
  exports:[
    JobHeaderComponent,
//    JobEditComponent

  ]
})
export class SahredModule { }
