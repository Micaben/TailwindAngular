import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

export const AuthGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  // si no hay token → login
  if (!auth.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }

  return true;
};