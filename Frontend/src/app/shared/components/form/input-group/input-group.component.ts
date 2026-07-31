import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-input-group',
  standalone: true,
  template: `
    <div class="flex w-full items-stretch">
      <ng-content select="[prefix]"></ng-content>
      <div class="flex-1">
        <ng-content select="[input]"></ng-content>
      </div>
      <ng-content select="[suffix]"></ng-content>
    </div>
  `
})
export class InputGroupComponent {

  @HostBinding('class')
  hostClass = `
    border border-gray-300 rounded-md overflow-hidden
    bg-white
    focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
  `;
}