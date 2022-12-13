import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.routes').then((routes) => routes.UserRoutes),
  },
];
