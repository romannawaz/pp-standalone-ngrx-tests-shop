import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginData, RegisterData, Tokens } from './auth.interface';

describe('AuthService', () => {
  let service: AuthService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let expectedTokens: Tokens;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    expectedTokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Login Success', () => {
    const mockLoginData: LoginData = {
      email: 'string',
      password: 'string',
    };

    service.login(mockLoginData).subscribe((tokens) => {
      expect(tokens).withContext('login tokens').toEqual(expectedTokens);
    });

    const req = httpTestingController.expectOne(service.apiUrlLogin);
    req.flush(expectedTokens);
  });

  it('Register Success', () => {
    const mockRegisterData: RegisterData = {
      name: 'string',
      email: 'string',
      password: 'string',
    };

    service.register(mockRegisterData).subscribe((tokens) => {
      expect(tokens).withContext('register tokens').toEqual(expectedTokens);
    });

    const req = httpTestingController.expectOne(service.apiUrlRegister);
    req.flush(expectedTokens);
  });
});
