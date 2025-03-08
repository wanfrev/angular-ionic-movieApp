import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSearchbar, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

interface Movie {
  title: string;
  description: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, CommonModule, FormsModule, IonLabel, IonSearchbar, IonButton, IonButtons],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchMovies() {
    // Implementar la lógica de búsqueda aquí
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }
}
