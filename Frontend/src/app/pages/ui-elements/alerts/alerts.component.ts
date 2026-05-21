import { Component, Input } from '@angular/core';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { LucideAngularModule, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-angular';

@Component({
  selector: 'app-alerts',
  imports: [
    AlertComponent,
    ComponentCardComponent,
    PageBreadcrumbComponent,
    LucideAngularModule,
  ],
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent {
@Input() variant:
    | 'success'
    | 'error'
    | 'warning'
    | 'info' = 'info';

  @Input() title = '';
  @Input() message = '';

  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;
  readonly AlertTriangle = AlertTriangle;
  readonly Info = Info;
}
