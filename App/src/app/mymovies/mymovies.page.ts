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
    externalId?: string;
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
    this.http.get<any[]>(this.apiUrl).subscribe(
      (movies) => {
        this.myMovies = movies;
      },
      (error) => {
        console.error('Error al cargar películas:', error);
      }
    );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  createMovie() {
    const formData = new FormData();
    for (const key in this.newMovie) {
      if (this.newMovie.hasOwnProperty(key)) {
        const value = this.newMovie[key as keyof typeof this.newMovie];
        if (value !== undefined && value !== null) {
          if (key === 'categories' && typeof value === 'string') {
            const array = value.split(',').map(v => v.trim());
            formData.append(key, JSON.stringify(array));
          } else {
            formData.append(key, String(value));
          }
        }
      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.post(`${this.apiUrl}/create`, formData).subscribe(
      () => {
        this.loadMovies();
        this.closeAddModal();
        this.newMovie = {};
        this.imageFile = null;
        this.previewUrl = null;
      },
      (error) => {
        console.error('Error al crear película:', error);
        this.errorMessage = 'Error al crear película';
      }
    );
  }

  editMovie(movie: any) {
    this.selectedMovieId = movie._id;
    this.newMovie = { ...movie };
    this.openAddModal();
  }

  saveMovie() {
    const formData = new FormData();
    for (const key in this.newMovie) {
      if (this.newMovie.hasOwnProperty(key)) {
        const value = this.newMovie[key as keyof typeof this.newMovie];
        if (value !== undefined && value !== null) {
          if (key === 'categories' && typeof value === 'string') {
            const array = value.split(',').map(v => v.trim());
            formData.append(key, JSON.stringify(array));
          } else {
            formData.append(key, String(value));
          }
        }
      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.put(`${this.apiUrl}/update/${this.selectedMovieId}`, formData).subscribe(
      () => {
        this.loadMovies();
        this.closeAddModal();
        this.selectedMovieId = null;
        this.newMovie = {};
        this.imageFile = null;
        this.previewUrl = null;
      },
      (error) => {
        console.error('Error al guardar película:', error);
        this.errorMessage = 'Error al guardar película';
      }
    );
  }

  deleteMovie(movie: any) {
    if (confirm(`¿Estás seguro de eliminar "${movie.title}"?`)) {
      this.http.delete(`${this.apiUrl}/delete/${movie._id}`).subscribe(
        () => this.loadMovies(),
        (error) => {
          console.error('Error al eliminar película:', error);
        }
      );
    }
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
    window.history.back();
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
