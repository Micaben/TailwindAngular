
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { UserMetaCardComponent } from '../../pages/user-profile/user-meta-card/user-meta-card.component';
import { UserInfoCardComponent } from '../../pages/user-profile/user-info-card/user-info-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    PageBreadcrumbComponent,
    UserMetaCardComponent,
    UserInfoCardComponent
],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {

}
