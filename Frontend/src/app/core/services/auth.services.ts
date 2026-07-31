import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private TOKEN_KEY = 'token';
  private USER_KEY = 'user';
  constructor(private http: HttpClient) { }

  // LOGIN
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      API.login,
      data
    ).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
      })
    );
  }

  // obtener token
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // obtener usuario
  getUser() {
    const user = localStorage.getItem(this.USER_KEY);
    if (user !== null) {
      return JSON.parse(user);
    }
    return null;
  }

  // verificar si esta logueado?
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getUserName() {
    return this.getUser()?.nombre;
  }
}