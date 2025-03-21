import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mymovies',
  templateUrl: './mymovies.page.html',
  styleUrls: ['./mymovies.page.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class MymoviesPage implements OnInit {
  newMovie: {
    title?: string;
    originalTitle?: string;
    categories?: string;
    releaseDate?: string;
    synopsis?: string;
    cast?: string;
    director?: string;
    duration?: number;
    type?: string;
  } = {};

  imageFile: File | null = null;
  previewUrl: string | null = null;
  myMovies: any[] = [];
  errorMessage: string = '';
  apiUrl = '/api/movies';
  selectedMovieId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get<any[]>(`${this.apiUrl}/user-movies`, { withCredentials: true }).subscribe({
      next: (movies) => (this.myMovies = movies),
      error: (err) => {
        console.error('Error al cargar películas:', err);
        this.errorMessage = 'No se pudieron cargar tus películas.';
      }
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  createMovie() {
    if (!this.newMovie.title || !this.newMovie.originalTitle || !this.newMovie.director || !this.newMovie.duration || !this.newMovie.type) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    const formData = new FormData();
    for (const key in this.newMovie) {
      const value = (this.newMovie as any)[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.post(`${this.apiUrl}/create`, formData, { withCredentials: true }).subscribe({
      next: () => {
        this.loadMovies();
        this.resetForm();
        this.closeAddModal();
      },
      error: (err) => {
        console.error('Error al crear la película:', err);
        this.errorMessage = 'Error al crear la película.';
      }
    });
  }

  deleteMovie(movie: any) {
    if (!confirm(`¿Estás seguro de eliminar "${movie.title}"?`)) return;

    this.http.delete(`${this.apiUrl}/${movie._id}`, { withCredentials: true }).subscribe({
      next: () => this.loadMovies(),
      error: (err) => {
        console.error('Error al eliminar película:', err);
        this.errorMessage = 'No se pudo eliminar la película.';
      }
    });
  }

  editMovie(movie: any) {
    this.selectedMovieId = movie._id;
    this.newMovie = { ...movie };
    this.previewUrl = movie.imageUrl || null;
    this.openAddModal();
  }

  saveMovie() {
    if (!this.newMovie.title || !this.newMovie.originalTitle || !this.newMovie.director || !this.newMovie.duration || !this.newMovie.type) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    const formData = new FormData();
    for (const key in this.newMovie) {
      const value = (this.newMovie as any)[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    if (this.selectedMovieId) {
      this.http.put(`${this.apiUrl}/${this.selectedMovieId}`, formData, { withCredentials: true }).subscribe({
        next: () => {
          this.loadMovies();
          this.resetForm();
          this.closeAddModal();
        },
        error: (err) => {
          console.error('Error al editar la película:', err);
          this.errorMessage = 'Error al editar la película.';
        }
      });
    }
  }

  resetForm() {
    this.newMovie = {};
    this.imageFile = null;
    this.previewUrl = null;
    this.selectedMovieId = null;
  }

  openAddModal() {
    const modal = document.getElementById('addMovieModal');
    if (modal) modal.style.display = 'block';
  }

  closeAddModal() {
    const modal = document.getElementById('addMovieModal');
    if (modal) modal.style.display = 'none';
  }

  navigateBack() {
    history.back();
  }
}
