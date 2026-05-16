import { CommonModule } from '@angular/common';
import { Component, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full">
      <input
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        (input)="onInput($event)"
        (blur)="onBlur()"
        [step]="step"
        [ngClass]="inputClasses"
        (click)="openPicker($event)"
        [class.border-red-500]="shouldShowError"
        [class.border-gray-300]="!shouldShowError"        
      />

      @if (shouldShowError) {
        <p class="text-xs text-red-500 mt-1">
          {{ errorMessage }}
        </p>
      }
    </div>
  `
})

export class InputFieldComponent implements ControlValueAccessor, Validator {

  @Input() type: string = 'text';
  @Input() id?: string = '';
  @Input() name?: string = '';
  @Input() placeholder?: string = '';
  @Input() min?: string;
  @Input() max?: string;
  @Input() step?: number;
  @Input() disabled: boolean = false;
  @Input() success: boolean = false;
  @Input() error: boolean = false;
  @Input() hint?: string;
  @Input() className: string = '';
  @Output() valueChange = new EventEmitter<string | number>();
  @Input() required: boolean = false;
  touched = false;
  onChange: any = () => { };
  onTouched: any = () => { };
  @Input() value: any = '';
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && !this.value) {
      return { required: true };
    }
    return null;
  }
  onValidatorChange: any = () => { };

  writeValue(value: any): void {
    this.value = value;
    this.touched = false;
  }

  openPicker(event: any) {
    if (event.target.showPicker) {
      event.target.showPicker();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange(fn: any): void {
    this.onValidatorChange = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get inputClasses(): string {
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${this.className}`;
    if (this.disabled) {
      inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
    } else if (this.error) {
      inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
    } else if (this.success) {
      inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
    } else {
      inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
    }
    return inputClasses;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.touched = false;
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }

  get shouldShowError(): boolean {
    return this.required && this.touched && !this.value;
  }

  get errorMessage(): string {
    if (this.required && !this.value) {
      return 'Este campo es obligatorio';
    }
    return '';
  }

}
