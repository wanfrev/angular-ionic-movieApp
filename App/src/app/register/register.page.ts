import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IonicFeatureModule } from '../ionic.module';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicFeatureModule, FormsModule]
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  async handleRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('El email no es válido');
      return;
    }

    if (this.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`${environment.apiUrl}/users/register`, {
        email: this.email,
        password: this.password
      });
      alert('Registro Exitoso, ahora puedes iniciar sesión con tu cuenta.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Hubo un problema al registrar el usuario. Intenta de nuevo.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
