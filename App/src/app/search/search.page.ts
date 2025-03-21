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
  duration: number = 0;

  constructor(public router: Router, private movieService: MovieService, private location: Location) { }

  ngOnInit() {
    this.getGenres();
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

  searchMovies() {
    this.movieService.searchMovies(this.searchQuery, this.selectedGenre, this.year, this.duration).subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
      },
      error: (error: any) => {
        console.error('Error al buscar películas:', error);
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  navigateBack() {
    this.location.back();
  }
}
