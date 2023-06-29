import { createReducer, on } from '@ngrx/store';
import { Tokens, authActions } from './auth.action';

export interface IAuthState {
  tokens: Tokens;
  isLogged: boolean;
}

export const initialAuthState = {
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  isLogged: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.loggedSuccess, (state: IAuthState, tokens: Tokens) => ({
    ...state,
    tokens,
    isLogged: true,
  })),
  on(authActions.loggedFailure, () => initialAuthState)
);
