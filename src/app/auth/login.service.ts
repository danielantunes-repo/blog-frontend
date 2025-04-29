import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from './login';
import { Usuario } from './usuario';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/login';

  constructor() {}

  logar(login: Login): Observable<string> {
    return this.http
      .post<string>(this.API, login, { responseType: 'text' as 'json' })
      .pipe(
        tap((token: string) => {
          console.log('Token recebido:', token); // Verifique se o token está sendo recebido
          this.addToken(token); // Armazena o token
        })
      );
  }

  addToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  getUserId(): string | null {
    const payload = this.jwtDecode();
    if (payload && payload.sub) {
      return payload.sub; // Agora retornamos o 'username' do token
    }
    return null;
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role == role) return true;
    else return false;
  }
}
