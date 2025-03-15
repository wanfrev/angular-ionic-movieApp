import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, RouterModule, NgFor],
})
export class HomePage implements OnInit {
  popularMovies: any[] = [];

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.getPopularMovies();
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

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
