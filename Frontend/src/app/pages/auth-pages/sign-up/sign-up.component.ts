import { Component } from '@angular/core';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';
import { SignupFormComponent } from './signup-form.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    AuthPageLayoutComponent,
    SignupFormComponent,
  ],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export class SignUpComponent {

}
