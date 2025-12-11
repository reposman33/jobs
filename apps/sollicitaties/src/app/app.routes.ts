import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'sollicitaties', pathMatch: 'full'},
  {
    path: 'sollicitaties',
    loadComponent: () => import('./components/sollicitaties/sollicitaties')
      .then(m => m.Sollicitaties)
  },
  {
    path: 'add-sollicitatie',
    loadComponent: () => import('./components/add-sollicitatie/add-sollicitatie')
    .then(m => m.AddSollicitatieComponent)
  },
  { path: '**',
    loadComponent: () => import('./components/notfound/notfound')
      .then(m => m.Notfound)
    },
];
