import { NgModule, ModuleWithProviders } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { BusyComponent } from './components/busy/busy.component';
import { CommonModule } from '@angular/common';
import { MatLibModule } from 'mat-lib';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [
    AlertComponent,
    BusyComponent,
  ],
  imports: [
    CommonModule,
    MatLibModule
    
  ],
  exports: [
    AlertComponent, 
    BusyComponent,
  ],
  providers:[
  ]
})
export class RandrLibModule {
}
