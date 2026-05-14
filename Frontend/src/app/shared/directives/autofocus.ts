import {  Directive,  ElementRef,  AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appAutoFocusFirst]',
  standalone: true
})
export class AutoFocusFirstDirective
  implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {

    setTimeout(() => {

      const controls =
        this.el.nativeElement.querySelectorAll(
          'input, select, textarea'
        );

      const firstAvailable = Array.from(controls).find(
        (control: any) =>
          !control.disabled &&
          !control.readOnly &&
          control.offsetParent !== null
      ) as HTMLElement;

      if (firstAvailable) {
        firstAvailable.focus();
      }

    }, 0);
  }
}