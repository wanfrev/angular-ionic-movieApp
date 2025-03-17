import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3'; // URL base de la API externa
  private apiKey = '64d148b6a9644b7ea9ae5b72c887014a'; // Reemplaza con tu clave de API

  constructor() { }

  getPopularMovies(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data.results));
  }

  getRecommendedMovies(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/top_rated`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data.results));
  }

  getExploreMovies(): Observable<any> {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    return from(axios.get(`${this.apiUrl}/discover/movie`, {
      params: {
        api_key: this.apiKey,
        sort_by: 'release_date.desc', // Ordenar por fecha de lanzamiento descendente
        'release_date.lte': today // Filtrar por películas lanzadas hasta la fecha actual
      }
    }).then(response => response.data.results));
  }

  searchMovies(query: string, genre?: number, year?: number, duration?: number): Observable<any> {
    const params: any = {
      api_key: this.apiKey,
      query: query
    };

    if (genre !== undefined) {
      params.with_genres = genre;
    }

    if (year !== undefined) {
      params.primary_release_year = year;
    }

    if (duration !== undefined) {
      params.with_runtime_gte = duration;
    }

    return from(axios.get(`${this.apiUrl}/search/movie`, { params }).then(response => response.data.results));
  }

  getGenres(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/genre/movie/list`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data.genres));
  }

  getMovieDetails(movieId: string): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/${movieId}`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data));
  }
}
