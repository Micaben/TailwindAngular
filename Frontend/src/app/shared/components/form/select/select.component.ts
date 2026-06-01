import { Component, Input, forwardRef, Injector, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, NgControl, FormsModule } from '@angular/forms';
import { Option } from '../../../../core/models/option.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})

export class SelectComponent implements ControlValueAccessor, Validator {

  // =========================
  // INPUTS
  // =========================

  @Input() options: Option[] = [];
  @Input() placeholder = 'Seleccione una opción';
  @Input() customClass = '';
  @Input() submitted = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() control?: NgModel;
  // =========================
  // VALUE
  // =========================

  value = '';
  touched = false;

  // =========================
  // CONTROL VALUE ACCESSOR
  // =========================

  onChange = (value: string) => { };
  onTouched = () => { };
  writeValue(value: string): void {
    this.value = value ?? '';
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

  // =========================
  // EVENTS
  // =========================

  handleChange(event: Event): void {
    const value =
      (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  handleBlur(): void {
    this.touched = true;
    this.onTouched();
  }
  // =========================
  // VALIDATION
  // =========================
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && !control.value) {
      return { required: true };
    }

    return null;
  }

  get showError() {
    return !!(
      this.control?.invalid &&
      (this.control?.touched || this.submitted)
    );
  }
}