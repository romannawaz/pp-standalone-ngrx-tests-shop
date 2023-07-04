import { HttpErrorResponse } from '@angular/common/http';
import { LoginData, Tokens } from '@services/auth/auth.interface';

export const tokensStub: Tokens = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

export const loginDataStub: LoginData = {
  email: 'string',
  password: 'string',
};

export const httpErrorResponseStub = {
  error: {
    message: 'error',
  },
  status: 404,
} as HttpErrorResponse;
