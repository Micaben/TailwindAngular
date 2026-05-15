
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { CheckboxComponent } from '../../form/input/checkbox.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.services';
import { AlertService } from '../../../../core/services/alert.services';

@Component({
  selector: 'app-signin-form',
  imports: [
    LabelComponent,
    CheckboxComponent,
    ButtonComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './signin-form.component.html',
  styles: ``
})
export class SigninFormComponent {
  showAlert = false;
  alertVariant: 'success' | 'error' | 'warning' | 'info' = 'success';
  alertTitle = '';
  alertMessage = '';
  constructor(private http: HttpClient, private alertService: AlertService, private router: Router, private auth: AuthService) { }
  showPassword = false;
  isChecked = false;
  email = '';
  password = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.login(data).subscribe({
      next: (res) => {
        console.log('LOGIN OK:', res);
        this.alertService.success('Bienvenido');
      },

      error: (err) => {
        console.error(err);
        this.alertService.error('Credenciales incorrectas');
      }
    });
  }
}
