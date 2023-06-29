import { createActionGroup, emptyProps, props } from '@ngrx/store';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Logged Success': props<Tokens>(),
    'Logged Failure': emptyProps(),
  },
});
