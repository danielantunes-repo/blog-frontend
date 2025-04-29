import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../auth/usuario';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}/register`, usuario).pipe(
      catchError((error) => {
        console.error('Error during registration:', error);
        return throwError(
          () => new Error('Registration failed. Please try again.')
        );
      })
    );
  }
}
