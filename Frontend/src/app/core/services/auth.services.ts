import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private TOKEN_KEY = 'token';
  private USER_KEY = 'user';
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // LOGIN
  login(data: any): Observable<any> {

    return this.http.post<any>(`${this.API_URL}/login`, data).pipe(

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

  // está logueado?
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}