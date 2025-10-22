import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('userRole');
  const requiredRole = route.data['role'];

  if (userRole === requiredRole) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
