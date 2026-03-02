import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'jobs',
    loadComponent: () =>
      import('./components/jobs/jobs').then(
        (m) => m.jobs
      ),
    canActivate: [authGuard],
    canMatch: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.Login),
  },
  {
    path: 'registreer',
    loadComponent: () =>
      import('./components/registreer/registreer').then((m) => m.Registreer),
  },
  {
    path: 'add-job/:id',
    loadComponent: () =>
      import('./components/add-job/add-job').then(
        (m) => m.AddSollicitatieComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'add-job',
    loadComponent: () =>
      import('./components/add-job/add-job').then(
        (m) => m.AddSollicitatieComponent
      ),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound').then((m) => m.Notfound),
  },
];
