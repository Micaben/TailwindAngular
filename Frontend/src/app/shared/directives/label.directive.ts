import { Directive } from '@angular/core';

@Directive({
  selector: 'label[appLabel]',
  standalone: true,
  host: {
    class: 'mb-2 block text-sm font-medium'
  }
})
export class LabelDirective {}