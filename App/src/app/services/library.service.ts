import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Library {
  _id?: string;
  name: string;
  movies?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:5000/api/libraries';

  constructor(private http: HttpClient) { }

  createLibrary(library: Library): Observable<Library> {
    return this.http.post<Library>(`${this.apiUrl}/create`, library);
  }

  getLibraries(): Observable<Library[]> {
    return this.http.get<Library[]>(this.apiUrl);
  }

  addMovieToLibrary(libraryId: string, movieId: string): Observable<Library> {
    return this.http.post<Library>(`${this.apiUrl}/${libraryId}/add-movie/${movieId}`, {});
  }

  getLibraryById(libraryId: string): Observable<Library> {
    return this.http.get<Library>(`${this.apiUrl}/${libraryId}`);
  }
}
