// filepath: c:\Users\wanfr\OneDrive\Documentos\Computer-Engineering\URU\Moviles\movieApp\App\src\app\app.routes.ts
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
    redirectTo: 'login',
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
  },
  {
    path: 'detail-movie/:id', // Agrega el parámetro id a la ruta
    loadComponent: () => import('./detail-movie/detail-movie.page').then(m => m.MovieDetailPage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.page').then( m => m.ExplorePage)
  },
  {
    path: 'mymovies',
    loadComponent: () => import('./mymovies/mymovies.page').then( m => m.MymoviesPage)
  }
];
