import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RegisterData, Tokens } from './auth.interface';

@Injectable()
export class AuthService {
  private _apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<Tokens> {
    return this.http.post<Tokens>(this._apiUrl + '/auth/register', data);
  }
}
