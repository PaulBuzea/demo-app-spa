import { Routes } from '@angular/router';
import {authGuard} from './auth-guard';

export const routes: Routes = [
  {
    path: 'manager',
    loadComponent: () => import('./modules/manager/manager').then(m => m.Manager),
    canActivate: [authGuard],
    data: { role: 'manager' }
  },
  {
    path: 'co-worker',
    loadComponent: () => import('./modules/co-worker/co-worker').then(m => m.CoWorker),
    canActivate: [authGuard],
    data: { role: 'co-worker' }
  },
  {
    path: 'employee',
    loadComponent: () => import('./modules/employee/employee').then(m => m.Employee),
    canActivate: [authGuard],
    data: { role: 'employee' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login').then(m => m.Login)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./modules/unauthorized/unauthorized').then(m => m.Unauthorized)
  },
  {
    path: '**',
    loadComponent: () => import('./modules/login/login').then(m => m.Login)
  }
];
