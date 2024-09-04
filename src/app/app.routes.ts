import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: 'book',
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./books/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path:':id',
        loadComponent: () =>
          import('./books/book/book.component').then((m) => m.BookComponent),
      }
    ],
  },
];
