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
  errorMessage: string = '';

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
      }, { withCredentials: true });

      alert('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    } catch (error: unknown) {  // 📌 Especificamos el tipo 'unknown'
      const err = error as any;  // 📌 Convertimos a 'any' para acceder a sus propiedades
      this.errorMessage = err.response?.data?.error || 'Error al iniciar sesión';
      alert(this.errorMessage);
    }
  }

  navigateToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }
}
