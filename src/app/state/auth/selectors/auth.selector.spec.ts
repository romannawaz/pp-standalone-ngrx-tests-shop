import { createStore } from '../../testing/utils/store.util';
import { AUTH_FEATURE_KEY, AuthPartialState, initialAuthState } from '../reducer/auth.reducer';
import * as authSelectors from './auth.selector';
import { httpErrorResponseStub, tokensStub } from '../../testing/stubs/auth.stub';

describe('[Auth Selector]', () => {
  let state: AuthPartialState;
  const key = AUTH_FEATURE_KEY;

  beforeEach(() => {
    state = createStore(key, initialAuthState);
  });

  it('Should return tokens', () => {
    state = createStore(key, initialAuthState, { tokens: tokensStub });
    const result = authSelectors.selectTokens(state);

    expect(result).toEqual(tokensStub);
  });

  it('Should return isLogged', () => {
    state = createStore(key, initialAuthState, { isLogged: true });
    const result = authSelectors.selectIsLogged(state);

    expect(result).toBeTrue();
  });

  it('Should return error', () => {
    state = createStore(key, initialAuthState, {
      error: httpErrorResponseStub,
    });
    const result = authSelectors.selectError(state);

    expect(result).toEqual(httpErrorResponseStub);
  });
});
