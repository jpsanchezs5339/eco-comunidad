import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-scan',
  imports: [RouterLink],
  templateUrl: './scan.html',
  styleUrl: './scan.css',
})
export class Scan {
  readonly materials = ['Plastico', 'Carton', 'Vidrio', 'Metal'];
  isScanning = false;
  tip = 'Retira tapas y restos organicos antes de reciclar.';

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
  ) {}

  runScan(): void {
    this.isScanning = true;

    setTimeout(() => {
      const material = this.materials[Math.floor(Math.random() * this.materials.length)];
      const confidence = Math.floor(82 + Math.random() * 17);
      this.auth.addScan(material, confidence);
      this.router.navigate(['/escaneo-exitoso']);
    }, 900);
  }
}
