import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginData, Tokens } from '@services/auth/auth.interface';

@Injectable()
export abstract class AbstractAuthFacade {
  tokens$!: Observable<Tokens>;

  isLogged$!: Observable<boolean>;

  error$!: Observable<HttpErrorResponse | null>;

  loggedSuccess$!: Observable<Tokens>;

  loggedFailure$!: Observable<HttpErrorResponse>;

  abstract login(data: LoginData): void;
}
