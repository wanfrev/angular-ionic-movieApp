import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibraryService } from './library.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5000/api/movies';
  private libraryService!: LibraryService;

  constructor(private http: HttpClient, private injector: Injector) {
    setTimeout(() => {
      this.libraryService = this.injector.get(LibraryService);
    });
  }

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/popular`, { withCredentials: true });
  }

  getRecommendedMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top_rated`, { withCredentials: true });
  }

  getExploreMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover`, { withCredentials: true });
  }

  searchAllMovies(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?q=${query}`, { withCredentials: true });
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${movieId}`, { withCredentials: true });
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genres`, { withCredentials: true });
  }

  createMovie(movieData: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    for (const key in movieData) {
      formData.append(key, movieData[key]);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post(`${this.apiUrl}/create`, formData, {
      withCredentials: true,
    });
  }

  getUserMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-movies`, { withCredentials: true });
  }
}
