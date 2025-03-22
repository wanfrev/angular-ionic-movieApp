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
    categories?: string | string[];
    releaseDate?: string;
    synopsis?: string;
    cast?: string | string[];
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
    if (!this.newMovie.title || !this.imageFile) {
      this.errorMessage = 'Debes completar todos los campos y seleccionar una imagen.';
      return;
    }

    // 🔁 Convertir cadenas a arrays
    if (this.newMovie.categories && typeof this.newMovie.categories === 'string') {
      this.newMovie.categories = this.newMovie.categories
        .split(',')
        .map((c) => c.trim());
    }

    if (this.newMovie.cast && typeof this.newMovie.cast === 'string') {
      this.newMovie.cast = this.newMovie.cast
        .split(',')
        .map((c) => c.trim());
    }

    // 🔁 Convertir la fecha a formato ISO
    if (this.newMovie.releaseDate) {
      this.newMovie.releaseDate = new Date(this.newMovie.releaseDate).toISOString();
    }

    // 🧩 Preparar FormData para envío
    const formData = new FormData();
    formData.append('title', this.newMovie.title || '');
    formData.append('originalTitle', this.newMovie.originalTitle || '');
    formData.append('categories', JSON.stringify(this.newMovie.categories || []));
    formData.append('releaseDate', this.newMovie.releaseDate || '');
    formData.append('synopsis', this.newMovie.synopsis || '');
    formData.append('cast', JSON.stringify(this.newMovie.cast || []));
    formData.append('director', this.newMovie.director || '');
    formData.append('duration', (this.newMovie.duration || '').toString());
    formData.append('type', this.newMovie.type || '');

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.post(`${this.apiUrl}/create`, formData, { withCredentials: true }).subscribe({
      next: () => {
        this.newMovie = {};
        this.imageFile = null;
        this.previewUrl = null;
        this.loadMovies(); // recarga las películas del usuario
      },
      error: (err) => {
        console.error('Error al crear película:', err);
        this.errorMessage = 'No se pudo crear la película.';
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
