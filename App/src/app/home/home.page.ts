import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage implements OnInit {
  popularMovies: any[] = [];
  recommendedMovies: any[] = [];

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.getRecommendedMovies();
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
        console.log('Películas recomendadas:', this.recommendedMovies);
      },
      error: (error) => {
        console.error('Error al obtener películas recomendadas:', error);
      }
    });
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  navigateToDetail(movieId: number) {
    this.router.navigate([`/detail-movie`, movieId]);
  }
}
