import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'warning';
  message: string;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new BehaviorSubject<Alert | null>(null);

  alert$ = this.alertSubject.asObservable();

  show(type: Alert['type'], message: string) {
    this.alertSubject.next({
      type,
      message,
      show: true
    });

    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this.alertSubject.next(null);
  }
}