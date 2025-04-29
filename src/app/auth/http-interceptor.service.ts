import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  const publicEndpoints = ['/login', '/register'];

  if (
    token &&
    !publicEndpoints.some((endpoint) => router.url.includes(endpoint))
  ) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
            Swal.fire({
              title: 'Sessão expirada!',
              text: 'Faça login novamente.',
              icon: 'warning',
              confirmButtonText: 'OK',
            }).then(() => {
              router.navigate(['/login']);
            });
            break;

          case 403:
            Swal.fire({
              title: 'Acesso negado!',
              text: 'Você não tem permissão para acessar este recurso.',
              icon: 'error',
              confirmButtonText: 'OK',
            }).then(() => {
              router.navigate(['/login']);
            });
            break;

          default:
            console.error('Erro HTTP:', err);
            Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro ao processar a solicitação.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
        }
      } else {
        console.error('Erro inesperado:', err);
      }

      return throwError(() => err);
    })
  );
};
