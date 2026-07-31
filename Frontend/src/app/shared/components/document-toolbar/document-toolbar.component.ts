import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-document-toolbar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './document-toolbar.component.html'
})
export class DocumentToolbarComponent {

  @Output() new = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() search = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();
  @Input({ required: true }) state!: any;
  @Input() loading = false;
}