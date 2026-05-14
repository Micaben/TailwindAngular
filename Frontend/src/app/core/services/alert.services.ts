import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertData {
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject =
    new Subject<AlertData | null>();

  alertState$ =
    this.alertSubject.asObservable();

  show(
    variant: 'success' | 'error' | 'warning' | 'info',
    message: string,
    title: string = ''
  ) {

    this.alertSubject.next({
      variant,
      title,
      message
    });

    setTimeout(() => {
      this.alertSubject.next(null);
    }, 3000);
  }

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  warning(message: string) {
    this.show('warning', message);
  }

  info(message: string) {
    this.show('info', message);
  }
}