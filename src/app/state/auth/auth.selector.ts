import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURE_KEY, IAuthState } from './auth.reducer';

export const authSelector = createFeatureSelector<IAuthState>(AUTH_FEATURE_KEY);

export const selectTokens = createSelector(
  authSelector,
  (state: IAuthState) => state.tokens
);

export const selectIsLogged = createSelector(
  authSelector,
  (state) => state.isLogged
);

export const selectError = createSelector(authSelector, (state) => state.error);
