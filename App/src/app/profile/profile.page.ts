import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePage implements OnInit {
  username: string = '';
  email: string = '';

  constructor(private router: Router, private http: HttpClient, private location: Location) {}

ngOnInit() {
  console.log('ProfilePage initialized');
  this.getUserProfile();
}

getUserProfile() {
  this.http.get<{ username: string; email: string }>(
    'http://localhost:5000/api/users/profile',
    { withCredentials: true }
  )
  .subscribe(
    (data) => {
      this.username = data.username;
      this.email = data.email;
    },
    (error) => {
      console.error('Error al obtener el perfil:', error);
      this.router.navigate(['/login']);
    }
  );
}


  signOut() {
    this.http.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true }).subscribe(
      () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }


  navigateBack() {
    this.location.back();
  }
}
