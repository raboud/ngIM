import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Output, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Event } from '@angular/router';

const UPPERCASE_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UppercaseInputDirective),
  multi: true,
};
@Directive({
  selector: 'input[uppercase]',
  host: {
        // When the user updates the input
        '(input)': 'onInput($event.target.value)',
        '(blur)': 'onTouched()',
  },
  providers: [
    UPPERCASE_INPUT_CONTROL_VALUE_ACCESSOR,
  ],
})
export class UppercaseInputDirective extends DefaultValueAccessor {

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef, false);
  }

  override writeValue(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
  }

  onInput(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
    this.onChange(transformed);
  }

  private transformValue(value: any): any {
    const result = value && typeof value === 'string'
      ? value.toUpperCase()
      : value;

    return result;
  }
}
