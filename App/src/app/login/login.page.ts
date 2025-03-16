import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IonicFeatureModule } from '../ionic.module';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicFeatureModule, FormsModule]
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  async handleLogin() {
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await axios.post(`${environment.apiUrl}/users/login`, {
        username: this.username,
        password: this.password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Navegar a la ruta correcta de la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('Nombre de usuario o contraseña incorrectos');
    }
  }

  navigateToRegister(event: Event) {
    event.preventDefault();
    this.username = '';
    this.password = '';
    this.router.navigate(['/register']);
  }
}
