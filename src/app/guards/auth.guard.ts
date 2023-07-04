import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthFacade } from '../state/auth/facade/auth.facade';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authFacade = inject(AuthFacade);

  return authFacade.isLogged$.pipe(
    tap((isLogged) => {
      if (!isLogged) router.navigateByUrl('/auth');
    })
  );
};
