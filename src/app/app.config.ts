import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/auth/intercept/auth.interceptor';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provide the routing
    provideAnimationsAsync(), // Optional for animations
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideAnimationsAsync(), // HttpClient with interceptors
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      // preventDuplicates: true,
    }), 

  ]
};
