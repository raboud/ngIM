import { NgModule, ModuleWithProviders } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { BusyComponent } from './components/busy/busy.component';
import { CommonModule } from '@angular/common';
import { MatLibModule } from 'mat-lib';
import { UppercaseDirective } from './directives/uppercase.directive';
import { DisplayDataComponent } from './components/display-data/display-data.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AlertComponent,
    BusyComponent,
    DisplayDataComponent,
    UppercaseDirective,
    DragDropComponent
  ],
  imports: [
    CommonModule,
    MatLibModule,
    ReactiveFormsModule,
    HttpClientModule

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
