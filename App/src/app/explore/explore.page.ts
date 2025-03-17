import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service';

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
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExplorePage implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];
  genres: Genre[] = [];
  selectedGenre: number | undefined = undefined;
  year: number | undefined = undefined;
  duration: number = 0;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getGenres();
    this.getExploreMovies();
  }

  getGenres() {
    this.movieService.getGenres().subscribe((genres: Genre[]) => {
      this.genres = genres;
    });
  }

  getExploreMovies() {
    this.movieService.getExploreMovies().subscribe((results: any[]) => {
      const today = new Date();
      this.movies = results
        .filter((movie: any) => new Date(movie.release_date) <= today)
        .map((movie: any) => ({
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

  searchMovies() {
    this.movieService.searchMovies(this.searchQuery, this.selectedGenre, this.year, this.duration).subscribe((results: any[]) => {
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
    this.location.back();
  }
}
