import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { SearchPage } from './search/search.page';
import { LibraryPage } from './library/library.page';
import { ProfilePage } from './profile/profile.page';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'search',
    component: SearchPage
  },
  {
    path: 'library',
    component: LibraryPage
  },
  {
    path: 'profile',
    component: ProfilePage
  }
];
