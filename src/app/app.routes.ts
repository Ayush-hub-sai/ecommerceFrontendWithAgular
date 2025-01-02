import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
      path: 'auth',
      loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    },
    {
      path: 'pages',
      loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
      canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: 'auth/login' }
  ];
  
