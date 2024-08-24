import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(
    email: string | null | undefined,
    password: string | null | undefined
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  register(
    username: string | null | undefined,
    email: string | null | undefined,
    password: string | null | undefined): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/auth/register`, {
        username,
        email,
        password,
      });

    }
}
