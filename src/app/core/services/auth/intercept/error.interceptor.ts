import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../authService/auth.service';
import { GlobalService } from '../../global/global.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const authenticationService = inject(AuthService);
  const globalServie = inject(GlobalService)

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 0) {
      console.warn("Network error detected, reloading the page...");
      window.location.reload();
      return throwError(() => new Error('Network error'));
    }

    if (error.url !== `${globalServie.baseUrl}api/Login/token`) {
      if (error.status === 401) {
        console.warn("Unauthorized access, logging out...");
        authenticationService.logout();
        location.reload();
      }

      const errorMessage = error.error?.message || error.statusText || 'Unknown error occurred';
      return throwError(() => new Error(errorMessage));
    }

    return throwError(() => error);
  }));
};
