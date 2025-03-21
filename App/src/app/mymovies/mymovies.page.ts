import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Movie {
  _id: string;
  title: string;
  releaseDate: string;
  imageUrl: string;
  synopsis: string;
  director: string;
  duration: number;
  averageRating: number;
}

@Component({
  selector: 'app-mymovies',
  templateUrl: './mymovies.page.html',
  styleUrls: ['./mymovies.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HttpClientModule]
})
export class MymoviesPage implements OnInit {
  myMovies: Movie[] = [];
  showModal: boolean = false;
  newMovie: Partial<Movie> = {};
  imageFile: File | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get<Movie[]>('/api/movies', { withCredentials: true }).subscribe({
      next: (movies) => this.myMovies = movies,
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.errorMessage = 'No se pudieron cargar tus películas';
      }
    });
  }

  navigateBack() {
    window.history.back();
  }

  openAddModal() {
    this.showModal = true;
  }

  closeAddModal() {
    this.showModal = false;
    this.newMovie = {};
    this.imageFile = null;
    this.errorMessage = '';
  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  submitAddForm(event: Event) {
    event.preventDefault();

    if (!this.newMovie.title || !this.newMovie.synopsis || !this.newMovie.releaseDate || !this.newMovie.director) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newMovie.title);
    formData.append('synopsis', this.newMovie.synopsis);
    formData.append('releaseDate', this.newMovie.releaseDate);
    formData.append('director', this.newMovie.director);
    formData.append('duration', String(this.newMovie.duration || 0));
    formData.append('averageRating', String(this.newMovie.averageRating || 0));

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.post('/api/movies/create', formData, { withCredentials: true }).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadMovies();
      },
      error: (error) => {
        console.error('Error al agregar película:', error);
        this.errorMessage = 'No se pudo agregar la película';
      }
    });
  }

  deleteMovie(movieId: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      return;
    }

    this.http.delete(`/api/movies/${movieId}`, { withCredentials: true }).subscribe({
      next: () => {
        this.myMovies = this.myMovies.filter(movie => movie._id !== movieId);
      },
      error: (error) => {
        console.error('Error al eliminar película:', error);
        this.errorMessage = 'No se pudo eliminar la película';
      }
    });
  }
}
