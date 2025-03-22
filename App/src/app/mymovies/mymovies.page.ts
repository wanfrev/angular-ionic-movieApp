import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

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
    director?: string;
    duration?: number;
    externalId?: string;
    type?: 'movie' | 'series';
  } = {};


  imageFile: File | null = null;
  previewUrl: string | null = null;
  myMovies: any[] = [];
  errorMessage: string = '';
  apiUrl = 'http://localhost:5000/api/movies/user-movies';
  selectedMovieId: string | null = null;
  isAddModalOpen: boolean = false;

  constructor(private http: HttpClient, private location: Location) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get<any[]>(this.apiUrl, { withCredentials: true }).subscribe(
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

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  createMovie() {
    const formData = new FormData();

    if (!this.newMovie.externalId) {
      this.newMovie.externalId = uuidv4();
    }

    if (!this.newMovie.type) {
      this.newMovie.type = 'movie';
    }

    for (const key in this.newMovie) {
      if (this.newMovie.hasOwnProperty(key)) {
        const value = this.newMovie[key as keyof typeof this.newMovie];
        if (value !== undefined && value !== null) {
          if (key === 'categories' && typeof value === 'string') {
            const array = value.split(',').map(v => v.trim());
            formData.append(key, JSON.stringify(array));
          } else {
            formData.append(key, value.toString());
          }
        }
      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.post('/api/movies/create', formData, { withCredentials: true }).subscribe(
      () => {
        this.loadMovies();
        this.newMovie = {};
        this.imageFile = null;
        this.previewUrl = null;
        this.closeAddModal();
      },
      (error) => {
        console.error('Error al crear la película:', error);
        this.errorMessage = error?.error?.error || 'No se pudo crear la película';
      }
    );
  }


  deleteMovie(movieId: string) {
    this.http.delete(`http://localhost:5000/api/movies/${movieId}`, { withCredentials: true }).subscribe(
      () => {
        this.loadMovies();
      },
      (error) => {
        console.error('Error al eliminar la película:', error);
      }
    );
  }

  navigateBack() {
    this.location.back();
  }
}
