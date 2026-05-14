import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {  AlertService,  AlertData } from './core/services/alert.services';

import { AlertComponent } from './shared/components/ui/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterModule,
    AlertComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title = 'Angular Ecommerce Dashboard | TailAdmin';

  alert: AlertData | null = null;

  constructor(
    private alertService: AlertService
  ) {

    this.alertService.alertState$
      .subscribe(alert => {

        this.alert = alert;
      });
  }
}