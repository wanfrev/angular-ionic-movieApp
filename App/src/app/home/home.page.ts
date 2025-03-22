import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule]
})
export class HomePage implements OnInit {
  popularMovies: any[] = [];
  recommendedMovies: any[] = [];
  exploreMovies: any[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private movieService: MovieService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.verifySession();
  }

  verifySession() {
    this.http.get('http://localhost:5000/api/users/profile', { withCredentials: true }).subscribe({
      next: () => {
        this.getPopularMovies();
        this.getRecommendedMovies();
        this.getExploreMovies();
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe({
      next: (data) => {
        this.popularMovies = data;
        console.log('Películas populares:', this.popularMovies);
      },
      error: (error) => {
        console.error('Error al obtener películas populares:', error);
      }
    });
  }

  getRecommendedMovies() {
    this.movieService.getRecommendedMovies().subscribe({
      next: (data) => {
        this.recommendedMovies = data;
      },
      error: (error) => {
        console.error('Error al obtener películas recomendadas:', error);
      }
    });
  }

  getExploreMovies() {
    this.movieService.getExploreMovies().subscribe({
      next: (data) => {
        this.exploreMovies = data;
      },
      error: (error) => {
        console.error('Error al obtener películas por explorar:', error);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate(['/' + route]);
  }

  navigateToDetail(movieId: string) {
    this.router.navigate(['/detail-movie', movieId]);
  }
}
