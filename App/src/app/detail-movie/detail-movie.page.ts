import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class MovieDetailPage implements OnInit {
  movieId: string = '';
  movie: any = null;
  errorMessage: string = '';
  director: string = '';
  libraries: any[] = [];
  isAddToLibraryModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.movieId) {
      this.loadMovieDetails();
      this.loadLibraries();
    }
  }

  loadMovieDetails() {
    this.http.get(`/api/movies/${this.movieId}`, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.movie = data;
        this.director = data.director || 'Desconocido';
      },
      error: (err) => {
        console.error('Error al obtener detalles de película:', err);
        this.errorMessage = 'No se pudieron cargar los detalles de la película.';
      }
    });
  }

  loadLibraries() {
    this.http.get('/api/libraries', { withCredentials: true }).subscribe({
      next: (data: any) => this.libraries = data,
      error: (err) => console.error('Error al cargar bibliotecas:', err)
    });
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  openAddToLibraryModal() {
    this.isAddToLibraryModalOpen = true;
  }

  closeAddToLibraryModal() {
    this.isAddToLibraryModalOpen = false;
  }

  addToLibrary(libraryId: string) {
    this.http.post(`/api/libraries/${libraryId}/add-movie/${this.movieId}`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.closeAddToLibraryModal();
        alert('Película agregada a la biblioteca.');
      },
      error: (err) => {
        console.error('Error al agregar película a la biblioteca:', err);
        alert('Error al agregar la película.');
      }
    });
  }
}
