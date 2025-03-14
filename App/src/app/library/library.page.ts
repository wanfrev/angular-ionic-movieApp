import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class LibraryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }
}
