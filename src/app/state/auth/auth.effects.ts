import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { Tokens } from '@services/auth/auth.interface';
import { AuthService } from '@services/auth/auth.service';
import { authActions } from './auth.action';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      exhaustMap(({ data }) => {
        return authService.login(data).pipe(
          map((tokens: Tokens) => authActions.loggedSuccess({ tokens })),
          catchError((response: HttpErrorResponse) =>
            of(authActions.loggedFailure({ response }))
          )
        );
      })
    );
  },
  { functional: true }
);
