import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';
import { LoginData, Tokens } from '@services/auth/auth.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ data: LoginData }>(),
    'Logged Success': props<{ tokens: Tokens }>(),
    'Logged Failure': props<{ response: HttpErrorResponse }>(),
  },
});
