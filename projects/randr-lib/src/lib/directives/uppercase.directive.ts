import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter();

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    return event.key.toUpperCase();
  }
}
