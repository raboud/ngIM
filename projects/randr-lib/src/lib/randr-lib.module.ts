import { NgModule, ModuleWithProviders } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { BusyComponent } from './components/busy/busy.component';
import { CommonModule } from '@angular/common';
import { MatLibModule } from 'mat-lib';
import { UppercaseInputDirective } from './directives/uppercase-input.directive';
import { DisplayDataComponent } from './components/display-data/display-data.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UppercaseTextareaDirective } from './directives/uppercase-textarea.directive';
import { TextareaAutoresizeDirective } from './directives/textarea-autoresize.directive';

@NgModule({
  declarations: [
    AlertComponent,
    BusyComponent,
    DisplayDataComponent,
    UppercaseInputDirective,
    UppercaseTextareaDirective,
    TextareaAutoresizeDirective,
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
    UppercaseInputDirective,
    UppercaseTextareaDirective,
    TextareaAutoresizeDirective
  ],
  providers:[
  ]
})
export class RandrLibModule {
}
