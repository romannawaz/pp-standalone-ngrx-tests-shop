import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from './auth.reducer';

export const AUTH_FEATURE_KEY = 'auth';

export const authSelector = createFeatureSelector<IAuthState>(AUTH_FEATURE_KEY);

export const selectTokens = createSelector(
  authSelector,
  (state: IAuthState) => state.tokens
);

export const selectIsLogged = createSelector(authSelector, (state) => state.isLogged);
