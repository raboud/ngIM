import { NgModule, ModuleWithProviders } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { BusyComponent } from './components/busy/busy.component';
import { CommonModule } from '@angular/common';
import { MatLibModule } from 'mat-lib';
import { UppercaseDirective } from './directives/uppercase.directive';
import { DisplayDataComponent } from './components/display-data/display-data.component';

@NgModule({
  declarations: [
    AlertComponent,
    BusyComponent,
    DisplayDataComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    MatLibModule
    
  ],
  exports: [
    AlertComponent, 
    BusyComponent,
    DisplayDataComponent,
    UppercaseDirective
  ],
  providers:[
  ]
})
export class RandrLibModule {
}
