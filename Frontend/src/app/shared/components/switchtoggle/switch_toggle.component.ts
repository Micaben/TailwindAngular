import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './switch_toggle.component.html',
})
export class SwitchToggleComponent {

  @Input() ngModel: boolean = false;
  @Output() ngModelChange = new EventEmitter<boolean>();

  @Input() label: string = '';
  @Input() disabled: boolean = false;

  toggle(value: boolean) {
    this.ngModelChange.emit(value);
  }
}