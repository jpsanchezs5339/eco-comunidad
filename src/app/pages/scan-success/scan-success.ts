import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScanRecord } from '../../models/app.models';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-scan-success',
  imports: [CommonModule, RouterLink],
  templateUrl: './scan-success.html',
  styleUrl: './scan-success.css',
})
export class ScanSuccess {
  lastScan: ScanRecord | null;
  communityPoints = 0;

  constructor(private readonly auth: Auth) {
    this.lastScan = this.auth.getLastScan();
    this.communityPoints = this.auth.getStats().points;
  }
}
