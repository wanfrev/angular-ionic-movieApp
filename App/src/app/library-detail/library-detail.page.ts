import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-library-detail',
  templateUrl: './library-detail.page.html',
  styleUrls: ['./library-detail.page.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LibraryDetailPage implements OnInit {
  libraryId!: string;
  libraryName!: string;
  movies: string[] = [];

  constructor(private route: ActivatedRoute, private libraryService: LibraryService) { }

  ngOnInit() {
    this.libraryId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadLibraryDetails();
  }

  loadLibraryDetails() {
    this.libraryService.getLibraryById(this.libraryId).subscribe(library => {
      this.libraryName = library.name;
      this.movies = library.movies || [];
    });
  }
}
