import {
  Directive,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appAutoFocusFirst]',
  standalone: true
})
export class AutoFocusFirstDirective
  implements AfterViewInit, OnChanges {

  @Input() focusTrigger: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.focusFirst();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['focusTrigger']) {
      this.focusFirst();
    }
  }

  private focusFirst() {
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

      firstAvailable?.focus();
    });
  }
}