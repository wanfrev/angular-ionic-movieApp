import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Movie {
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get<Movie[]>('/api/movies').subscribe(movies => {
      this.myMovies = movies;
    });
  }

  navigateBack() {
    // Navegar de regreso a la página principal
    window.history.back();
  }

  openAddModal() {
    const modal = document.getElementById('addMovieModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeAddModal() {
    const modal = document.getElementById('addMovieModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  submitAddForm(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.http.post<Movie>('http://localhost:5000/api/movies/create', formData).subscribe(movie => {
      this.myMovies.push(movie);
      this.closeAddModal();
    }, error => {
      console.error('Error al agregar la película:', error);
    });
  }

  deleteMovie(movie: Movie) {
    this.myMovies = this.myMovies.filter(m => m !== movie);
  }
}
