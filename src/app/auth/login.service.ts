import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from './login';
import { Usuario } from './usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  // API = environment.SERVIDOR+'/api/login';
  API = 'https://blog-backend-montreal.up.railway.app'+'/api/login'

  constructor() {}

  logar(login: Login): Observable<string> {
    return this.http
      .post<string>(this.API, login, { responseType: 'text' as 'json' })
      .pipe(
        tap((token: string) => {
          console.log('Token recebido:', token); 
          this.addToken(token); 
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
