import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieDetailPage implements OnInit {
  movie: any;
  director: string | null = null; // Agregamos una propiedad para el director

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.getMovieDetails(movieId);
    } else {
      console.error('No se proporcionó un ID de película válido.');
    }
  }

  getMovieDetails(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (data: any) => {
        // Especificamos el tipo 'any' para data
        this.movie = data;
        console.log('Detalles de la película:', this.movie);

        // Obtener los créditos (crew) y encontrar al director
        if (data.credits && data.credits.crew) {
          const director = data.credits.crew.find(
            (member: any) => member.job === 'Director'
          );
          this.director = director ? director.name : 'N/A'; // Asignamos el nombre del director o 'N/A'
        } else {
          this.director = 'N/A'; // Si no hay créditos o crew, asignamos 'N/A'
        }
      },
      error: (error) => {
        console.error('Error al obtener detalles de la película:', error);
      },
    });
  }

  navigateBack() {
    this.location.back();
  }
}
