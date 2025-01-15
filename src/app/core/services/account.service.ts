import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  APILoginResponse,
  APIResponse,
  DTORegister,
  IAccount,
} from '@app/core/model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiUrl: string = 'http://localhost:3001/api';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<APILoginResponse> {
    const loginUrl = `${this.apiUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<APILoginResponse>(loginUrl, body);
  }

  register({
    email,
    password,
    firstName,
    lastName,
    role,
  }: DTORegister): Observable<APIResponse<IAccount>> {
    const loginUrl = `${this.apiUrl}/auth/register`;
    const body = { email, password, firstName, lastName, role };

    return this.http.post<APIResponse<IAccount>>(loginUrl, body);
  }

  getMe(accessToken: string): Observable<APIResponse<IAccount>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get<APIResponse<IAccount>>(`${this.apiUrl}/user/me`, {
      headers,
    });
  }
}
