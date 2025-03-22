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
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  async handleRegister() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`${environment.apiUrl}/users/register`, {
        username: this.username,
        email: this.email,
        password: this.password,
      }, { withCredentials: true });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // 🔐 Guarda el token
      }

      alert('Registro exitoso');
      this.router.navigate(['/home']);
    } catch (error: unknown) {
      const err = error as any;
      this.errorMessage = err.response?.data?.error || 'Error al registrar usuario';
      alert(this.errorMessage);
    }
  }

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

}
