import { Directive } from '@angular/core';

@Directive({
  selector: 'label[appLabel]',
  standalone: true,
  host: {
    class: 'mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
  }
})
export class LabelDirective {}