import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RandrLibModule } from 'randr-lib';
import { MatLibModule } from 'mat-lib';
import { JobHeaderComponent } from './components/job-header/job-header.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { JobService } from './services/job.service';
import { MsalLibModule } from 'msal-lib';
import { ListService } from './services/list.service';


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
    MsalLibModule,
   ],
  providers:[
    JobService,
    ListService
  ],
  exports:[
    JobHeaderComponent,
//    JobEditComponent

  ]
})
export class SahredModule { }
