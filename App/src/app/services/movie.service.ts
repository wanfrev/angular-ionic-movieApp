import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5000/api/movies'; // URL base del backend

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/popular`);
  }

  getRecommendedMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top_rated`);
  }

  getExploreMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover`);
  }

  searchMovies(query: string, genre?: number, year?: number, duration?: number): Observable<any> {
    const params: any = { query };

    if (genre !== undefined) {
      params.genre = genre;
    }

    if (year !== undefined) {
      params.year = year;
    }

    if (duration !== undefined) {
      params.duration = duration;
    }

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genres`);
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${movieId}`);
  }
}
