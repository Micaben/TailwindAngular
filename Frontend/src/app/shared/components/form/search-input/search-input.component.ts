import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputFieldComponent } from '../input/input-field.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  imports: [
  FormsModule,
]
})
export class SearchInputComponent {

  @Input() value = '';

  @Output() search =
    new EventEmitter<void>();

}