import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiService } from '@services/api/api.service';
import { LoginData, RegisterData, Tokens } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrlLogin = this.apiService.apiUrl + '/auth/login';
  apiUrlRegister = this.apiService.apiUrl + '/auth/register';

  constructor(private http: HttpClient, private apiService: ApiService) {}

  login(data: LoginData): Observable<Tokens> {
    return this.http.post<Tokens>(this.apiUrlLogin, data);
  }

  register(data: RegisterData): Observable<Tokens> {
    return this.http.post<Tokens>(this.apiUrlRegister, data);
  }
}
