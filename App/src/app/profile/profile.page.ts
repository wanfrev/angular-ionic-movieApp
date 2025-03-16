import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importar HttpClient y HttpClientModule
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Asegurarse de que HttpClientModule esté aquí
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePage implements OnInit {
  username: string | null = null;
  email: string | null = null;

  constructor(private router: Router, private http: HttpClient, private location: Location) { } // Inyectar Location

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.http.get('http://localhost:5000/api/users/profile', { withCredentials: true }).subscribe((response: any) => {
      this.username = response.username;
      this.email = response.email;
    }, (error) => {
      console.error('Error al obtener el perfil del usuario:', error);
      // Redirigir al usuario a la página de inicio de sesión si hay un error
      if (error.status === 401 || error.status === 403) {
        this.router.navigate(['/login']);
      }
    });
  }

  signOut() {
    this.http.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true }).subscribe(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  navigateBack() {
    this.location.back(); // Navegar a la página anterior
  }
}
