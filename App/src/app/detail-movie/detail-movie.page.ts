import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Movie {
  _id?: string;
  title: string;
  originalTitle: string;
  releaseDate: string;
  imageUrl?: string;
  synopsis: string;
  director: string;
  duration: number;
  type: string;
  categories: string[];
  cast: string[];
}

@Component({
  selector: 'app-mymovies',
  templateUrl: './mymovies.page.html',
  styleUrls: ['./mymovies.page.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class MovieDetailPage  implements OnInit {
  newMovie: Partial<Movie> = {};
  imageFile: File | null = null;
  myMovies: Movie[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get<Movie[]>('/api/movies', { withCredentials: true }).subscribe({
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
    }
  }

  imagePreview(): string {
    return this.imageFile ? URL.createObjectURL(this.imageFile) : '';
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
        if (Array.isArray(value)) {
          formData.append(key, value.join(','));
        } else {
          formData.append(key, value);
        }
      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.post('/api/movies/create', formData, { withCredentials: true }).subscribe({
      next: () => {
        this.loadMovies();
        this.newMovie = {};
        this.imageFile = null;
      },
      error: (err) => {
        console.error('Error al crear la película:', err);
        this.errorMessage = 'Error al crear la película.';
      }
    });
  }
}
