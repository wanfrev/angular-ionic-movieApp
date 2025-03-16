import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Importar Location
import { MovieService } from '../services/movie.service'; // Importar el servicio

interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
  genre: string;
  runtime: number;
  release_date: string;
}

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];
  genres: Genre[] = [];
  selectedGenre: number | undefined = undefined;
  year: number | undefined = undefined;
  duration: number = 0; // Inicializar la duración en 0

  constructor(private router: Router, private movieService: MovieService, private location: Location) { } // Inyectar Location

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.movieService.getGenres().subscribe((genres: any) => {
      this.genres = genres;
    });
  }

  searchMovies() {
    this.movieService.searchMovies(this.searchQuery, this.selectedGenre, this.year, this.duration).subscribe(results => {
      this.movies = results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        genre: movie.genre_ids.map((id: number) => this.genres.find(g => g.id === id)?.name).join(', '),
        runtime: movie.runtime,
        release_date: movie.release_date
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
