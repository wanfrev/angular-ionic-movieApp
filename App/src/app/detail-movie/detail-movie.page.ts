import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MovieDetailPage implements OnInit {
  movie: any = null;
  director: string | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.verifySession();
  }

  verifySession() {
    this.http.get('http://localhost:5000/api/users/profile', { withCredentials: true }).subscribe({
      next: () => {
        const movieId = this.route.snapshot.paramMap.get('id');
        if (movieId) {
          this.getMovieDetails(movieId);
        } else {
          this.errorMessage = 'ID de película no válido';
        }
      },
      error: (error: any) => {
        console.error('Error de sesión:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  getMovieDetails(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (data: any) => {
        this.movie = data;
        const crew = data.credits?.crew;
        if (crew && Array.isArray(crew)) {
          const dir = crew.find((member: any) => member.job === 'Director');
          this.director = dir ? dir.name : 'Desconocido';
        } else {
          this.director = 'Desconocido';
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Error al obtener detalles de la película';
        console.error(error);
      }
    });
  }

  navigateBack(): void {
    this.location.back();
  }
}
