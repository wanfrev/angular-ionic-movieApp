import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
import { MovieService } from '../services/movie.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-movie-detail',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // Agrega CommonModule a los imports
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieDetailPage implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router, // Agrega Router al constructor
    private location: Location // Inyectar Location
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
      next: (data) => {
        this.movie = data;
        console.log('Detalles de la película:', this.movie);
      },
      error: (error) => {
        console.error('Error al obtener detalles de la película:', error);
      }
    });
  }

  navigateBack() {
    this.location.back(); // Navegar a la página anterior
  }
}
