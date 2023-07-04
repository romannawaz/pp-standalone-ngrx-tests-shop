import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Tokens } from '@services/auth/auth.interface';
import { authActions } from './auth.action';

export const AUTH_FEATURE_KEY = 'auth';

export interface IAuthState {
  tokens: Tokens;
  isLogged: boolean;
  error: HttpErrorResponse | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: IAuthState;
}

export const initialAuthState: IAuthState = {
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  isLogged: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.loggedSuccess, (state: IAuthState, { tokens }) => ({
    ...state,
    tokens,
    isLogged: true,
    error: null,
  })),
  on(authActions.loggedFailure, (state: IAuthState, { response }) => ({
    ...initialAuthState,
    error: response,
  }))
);
