import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  { path: 'sollicitaties',
    loadComponent: () => import('./components/sollicitaties/sollicitaties')
    .then(m => m.Sollicitaties),
    canActivate: [authGuard],
    canMatch: [authGuard]
  },
  {path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login)},
  {path: 'registreer', loadComponent: () => import('./components/registreer/registreer').then(m => m.Registreer)},
  {
    path: 'add-sollicitatie/:id',
    loadComponent: () => import('./components/add-sollicitatie/add-sollicitatie')
    .then(m => m.AddSollicitatieComponent),
    canActivate: [authGuard]
  },
  {
    path: 'add-sollicitatie',
    loadComponent: () => import('./components/add-sollicitatie/add-sollicitatie')
    .then(m => m.AddSollicitatieComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'sollicitaties', pathMatch: 'full'},
  { path: '**',
    loadComponent: () => import('./components/notfound/notfound')
    .then(m => m.Notfound)
  }
];
