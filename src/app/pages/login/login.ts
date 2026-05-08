import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
  ) {}

  login(): void {
    if (!this.email.trim()) {
      this.error = 'Ingresa un correo para continuar.';
      return;
    }

    this.auth.login(this.email, this.password);
    this.router.navigate(['/inicio']);
  }
}
