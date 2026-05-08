import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptedTerms = false;
  error = '';

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
  ) {}

  register(): void {
    if (!this.name.trim() || !this.email.trim()) {
      this.error = 'Completa nombre y correo para crear tu cuenta.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contrasenas no coinciden.';
      return;
    }

    if (!this.acceptedTerms) {
      this.error = 'Debes aceptar los terminos para continuar.';
      return;
    }

    this.auth.register(this.name, this.email, this.password);
    this.router.navigate(['/inicio']);
  }
}
