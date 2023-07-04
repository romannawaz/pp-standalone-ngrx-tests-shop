import { of, throwError } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';
import { authActions } from '../actions/auth.actions';
import * as authEffects from './auth.effects';
import { httpErrorResponseStub, tokensStub } from '../../testing/stubs/auth.stub';

describe('[Auth Effects]', () => {
  it('Logged Success', (done: DoneFn) => {
    let authServiceMock = {
      login: () => of(tokensStub),
    } as unknown as AuthService;
    const actionMock$ = of(authActions.login);

    authEffects
      .loginEffect(actionMock$, authServiceMock)
      .subscribe((action) => {
        expect(action).toEqual(
          authActions.loggedSuccess({ tokens: tokensStub })
        );

        done();
      });
  });

  it('Logged Failure', (done: DoneFn) => {
    let authServiceMock = {
      login: () => throwError(() => httpErrorResponseStub),
    } as unknown as AuthService;
    const actionMock$ = of(authActions.login);

    authEffects
      .loginEffect(actionMock$, authServiceMock)
      .subscribe((action) => {
        expect(action).toEqual(
          authActions.loggedFailure({ response: httpErrorResponseStub })
        );

        done();
      });
  });
});
