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
    public router: Router,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getGenres();
    this.getExploreMovies();
  }

  getGenres() {
    this.movieService.getGenres().subscribe({
      next: (genres: Genre[]) => {
        this.genres = genres;
      },
      error: (error: any) => {
        console.error('Error al obtener géneros:', error);
      }
    });
  }

  getExploreMovies() {
    this.movieService.getExploreMovies().subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
      },
      error: (error: any) => {
        console.error('Error al obtener películas por explorar:', error);
      }
    });
  }

  searchMovies() {
    this.movieService.searchAllMovies(this.searchQuery).subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
      },
      error: (error: any) => {
        console.error('Error al buscar películas:', error);
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail-movie', id]);
  }

  navigateBack() {
    this.location.back();
  }
}
