import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertService } from './core/services/alert.services';
import { AlertComponent } from './shared/components/ui/alert/alert.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    AlertComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private alertService = inject(AlertService);
  title = 'Angular Ecommerce Dashboard | TailAdmin';
  alert$ = this.alertService.alertState$;

}