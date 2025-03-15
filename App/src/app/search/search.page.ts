import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSearchbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Importar Location
import { MovieService } from '../services/movie.service'; // Importar el servicio

interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonSearchbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];

  constructor(private router: Router, private movieService: MovieService, private location: Location) { } // Inyectar Location

  ngOnInit() {
  }

  searchMovies() {
    if (this.searchQuery.trim() === '') {
      this.movies = [];
      return;
    }

    this.movieService.searchMovies(this.searchQuery).subscribe(results => {
      this.movies = results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      }));
    });
  }

  openMovieDetail(movieId: number) {
    this.router.navigate(['/detail-movie', movieId]);
  }

  navigateBack() {
    this.location.back(); // Navegar a la página anterior
  }
}
