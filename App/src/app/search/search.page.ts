import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service';

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
  movies: any[] = [];

  constructor(
    public router: Router,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit() {}

  searchMovies() {
    if (!this.searchQuery.trim()) {
      this.movies = [];
      return;
    }

    this.movieService.searchAllMovies(this.searchQuery).subscribe(
      (response) => {
        this.movies = [
          ...response.userMovies.map((m: any) => ({ ...m, source: 'local' })),
          ...response.tmdbMovies
            .filter((tmdb: any) =>
              !response.userMovies.some((user: any) => user.title === tmdb.title)
            )
            .map((m: any) => ({ ...m, source: 'tmdb' }))
        ];
      },
      (error) => {
        console.error('Error al buscar películas:', error);
      }
    );
  }

  goToDetail(id: string): void {
    this.router.navigate(['/detail-movie', id]);
  }


  navigateBack() {
    this.location.back();
  }
}
