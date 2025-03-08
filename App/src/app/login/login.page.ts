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
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  async handleLogin() {
    if (!this.email || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('El email no es válido');
      return;
    }

    try {
      const response = await axios.post(`${environment.apiUrl}/login`, {
        email: this.email,
        password: this.password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Navegar a la ruta correcta de la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('Correo o contraseña incorrectos');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
