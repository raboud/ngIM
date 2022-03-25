import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  @HostListener('input', ['$event']) onInputChange($event: any) {
    $event.target.value  = $event.target.value.toUpperCase();
    this.ngModelChange.emit($event.target.value );
  }
}
