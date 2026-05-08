import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ImpactStats } from '../../models/app.models';

@Component({
  selector: 'app-impact',
  imports: [CommonModule, RouterLink],
  templateUrl: './impact.html',
  styleUrl: './impact.css',
})
export class Impact {
  stats: ImpactStats;

  constructor(private readonly auth: Auth) {
    this.stats = this.auth.getStats();
  }

  progressPercent(): number {
    return Math.min(100, Math.round((this.stats.totalKg / 1800) * 100));
  }
}
