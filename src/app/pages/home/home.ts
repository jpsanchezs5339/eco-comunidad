import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ImpactStats } from '../../models/app.models';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userName = 'Vecino';
  stats: ImpactStats;

  constructor(private readonly auth: Auth) {
    this.stats = this.auth.getStats();
    const session = this.auth.currentSession();
    if (session) {
      this.userName = session.name;
    }
  }
}
