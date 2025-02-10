import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/auth/intercept/auth.interceptor';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { jwtInterceptor } from './core/services/auth/intercept/jwt.interceptor';
import { errorInterceptor } from './core/services/auth/intercept/error.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provide the routing
    provideAnimationsAsync(), // Optional for animations
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withInterceptors([jwtInterceptor]),
      withInterceptors([errorInterceptor])
    ),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      // preventDuplicates: true,
    }),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })

  ]
};
