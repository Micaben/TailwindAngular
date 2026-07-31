import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';
import { SigninFormComponent } from './signin-form.component';
import { AuthService } from '../../../core/services/auth.services'; // ajusta la ruta

@Component({
  selector: 'app-sign-in',
  imports: [
    AuthPageLayoutComponent,
    SigninFormComponent,

  ],
  templateUrl: './sign-in.component.html',
  styles: ``
})

export class SignInComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
