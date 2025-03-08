import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSearchbar } from '@ionic/angular/standalone';

interface Movie {
  title: string;
  description: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, CommonModule, FormsModule, IonLabel, IonSearchbar]
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];

  constructor() { }

  ngOnInit() {

  }

  searchMovies() {
  }
}
