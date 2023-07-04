import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, map } from 'rxjs';

import { LoginData, Tokens } from '@services/auth/auth.interface';
import { authActions } from '../actions/auth.actions';
import * as AuthSelectors from '../selectors/auth.selector';
import { AbstractAuthFacade } from './auth.facade.interface';

@Injectable({ providedIn: 'root' })
export class AuthFacade implements AbstractAuthFacade {
  tokens$: Observable<Tokens> = this.store.select(AuthSelectors.selectTokens);

  isLogged$: Observable<boolean> = this.store.select(
    AuthSelectors.selectIsLogged
  );

  error$: Observable<HttpErrorResponse | null> = this.store.select(
    AuthSelectors.selectError
  );

  loggedSuccess$: Observable<Tokens> = this.actions.pipe(
    ofType(authActions.loggedSuccess)
  );

  loggedFailure$: Observable<HttpErrorResponse> = this.actions.pipe(
    ofType(authActions.loggedFailure),
    map(({ response }) => response)
  );

  constructor(
    private readonly actions: Actions,
    private readonly store: Store
  ) {}

  login(data: LoginData): void {
    this.store.dispatch(authActions.login({ data }));
  }
}
