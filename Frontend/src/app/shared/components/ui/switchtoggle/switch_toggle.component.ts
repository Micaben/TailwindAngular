import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './switch_toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchToggleComponent),
      multi: true
    }
  ]
})

export class SwitchToggleComponent implements ControlValueAccessor {

  @Input() label = '';
  @Input() disabled = false;
@Output() ngModelChange = new EventEmitter<boolean>();
  value = false;
  private onChange = (value: boolean) => { };
  private onTouched = () => { };

  writeValue(value: boolean): void {
    this.value = value ?? false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(value: boolean): void {

  this.value = value;

  this.onChange(value);
  this.onTouched();

  this.ngModelChange.emit(value);
}
}