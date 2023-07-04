import { authActions } from '../actions/auth.actions';
import { IAuthState, authReducer, initialAuthState } from './auth.reducer';
import { httpErrorResponseStub, tokensStub } from '../../testing/stubs/auth.stub';

describe('[Auth Reducer]', () => {
  let state: IAuthState;

  beforeEach(() => {
    state = initialAuthState;
  });

  describe('Valid Auth actions', () => {
    it('Logged success, should set error false, isLogged true and set tokens', () => {
      const action = authActions.loggedSuccess({ tokens: tokensStub });
      const result = authReducer(state, action);

      expect(result.error).toBeFalsy();
      expect(result.isLogged).toBeTrue();
      expect(result.tokens).toEqual(tokensStub);
    });

    it('Logged failure, should set error true and other like initial state', () => {
      const action = authActions.loggedFailure({
        response: httpErrorResponseStub,
      });
      const result = authReducer(state, action);

      expect(result.error).toEqual(httpErrorResponseStub);
      expect(result.isLogged).toBeFalse();
      expect(result.tokens).toEqual(initialAuthState.tokens);
    });
  });

  describe('Unknown action', () => {
    it('Should return the previous state', () => {
      const action = {} as any;

      const result = authReducer(initialAuthState, action);

      expect(result).toBe(initialAuthState);
    });
  });
});
