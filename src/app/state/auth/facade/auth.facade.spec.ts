import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { first, of } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';
import { AbstractAuthFacade } from './auth.facade.interface';
import { AuthFacade } from '../facade/auth.facade';
import {
  AUTH_FEATURE_KEY,
  AuthPartialState,
  authReducer,
  initialAuthState,
} from '../reducer/auth.reducer';
import * as authEffects from '../effects/auth.effects';
import { loginDataStub, tokensStub } from '../../testing/stubs/auth.stub';

describe('[Auth Facade]', () => {
  let store: Store<AuthPartialState>;
  let facade: AbstractAuthFacade;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
        EffectsModule.forFeature(authEffects),
      ],
      providers: [
        {
          provide: AbstractAuthFacade,
          useClass: AuthFacade,
        },
        {
          provide: AuthService,
          useValue: {
            login: () => of(tokensStub),
          },
        },
      ],
    })
    class CustomFeatureModule {}

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        CustomFeatureModule,
      ],
    });

    store = TestBed.inject(Store);
    facade = TestBed.inject(AbstractAuthFacade);
  });

  it('login', (done: DoneFn) => {
    try {
      facade.tokens$.pipe(first()).subscribe((tokensResponse) => {
        expect(tokensResponse).toEqual(initialAuthState.tokens);
      });

      facade.login(loginDataStub);

      facade.tokens$.pipe(first()).subscribe((tokensResponse) => {
        expect(tokensResponse).toEqual(tokensStub);
      });

      done();
    } catch (error) {
      done.fail(error as string | Error);
    }
  });
});
