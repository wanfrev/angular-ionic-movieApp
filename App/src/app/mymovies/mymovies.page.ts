import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

interface Movie {
  title: string;
  release_date: string;
  poster_path: string;
}

@Component({
  selector: 'app-mymovies',
  templateUrl: './mymovies.page.html',
  styleUrls: ['./mymovies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MymoviesPage implements OnInit {
  myMovies: Movie[] = [];

  constructor() { }

  ngOnInit() {
    // Inicializar con algunas películas de ejemplo
    this.myMovies = [
      { title: 'Movie 1', release_date: '2022-01-01', poster_path: 'https://via.placeholder.com/200x300' },
      { title: 'Movie 2', release_date: '2022-02-01', poster_path: 'https://via.placeholder.com/200x300' },
      { title: 'Movie 3', release_date: '2022-03-01', poster_path: 'https://via.placeholder.com/200x300' }
    ];
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
    const input = (event.target as HTMLFormElement).elements.namedItem('movieName') as HTMLInputElement;
    const name = input.value;

    if (name) {
      // Agregar una película de ejemplo
      this.myMovies.push({ title: name, release_date: '2022-04-01', poster_path: 'https://via.placeholder.com/200x300' });
      this.closeAddModal();
    }
  }

  deleteMovie(movie: Movie) {
    this.myMovies = this.myMovies.filter(m => m !== movie);
  }
}
