import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  @HostListener('input', ['$event']) onInputChange($event) {
    $event.target.value  = $event.target.value.toUpperCase();
    this.ngModelChange.emit($event.target.value );
  }
}
