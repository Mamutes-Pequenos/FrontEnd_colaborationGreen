import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const routeGuardGuard: CanActivateFn = (route, state) => {

  let loginService = inject(UserService);
  let roteador = inject(Router);

  if (loginService.getToken() == null) {
    roteador.navigate(['/login']);
    return false;
  } else
    return true;

};
