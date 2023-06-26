import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginData, RegisterData, Tokens } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = 'http://localhost:3000/api';
  apiUrlLogin = this.apiUrl + '/auth/login';
  apiUrlRegister = this.apiUrl + '/auth/register';

  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<Tokens> {
    return this.http.post<Tokens>(this.apiUrlLogin, data);
  }

  register(data: RegisterData): Observable<Tokens> {
    return this.http.post<Tokens>(this.apiUrlRegister, data);
  }
}
