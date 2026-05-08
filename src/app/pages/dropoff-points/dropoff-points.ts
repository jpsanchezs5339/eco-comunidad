import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface DropoffPoint {
  name: string;
  distance: string;
  schedule: string;
  materials: string[];
  open: boolean;
}

@Component({
  selector: 'app-dropoff-points',
  imports: [CommonModule, RouterLink],
  templateUrl: './dropoff-points.html',
  styleUrl: './dropoff-points.css',
})
export class DropoffPoints {
  readonly points: DropoffPoint[] = [
    {
      name: 'Punto Central Vereda',
      distance: '1.2 km',
      schedule: 'Lun - Vie: 08:00 - 16:00',
      materials: ['Plastico', 'Vidrio', 'Carton'],
      open: true,
    },
    {
      name: 'Eco-Acopio El Roble',
      distance: '3.8 km',
      schedule: 'Sabado: 09:00 - 13:00',
      materials: ['Aceites', 'Metal'],
      open: true,
    },
    {
      name: 'Nodo Rural Las Palmas',
      distance: '5.0 km',
      schedule: 'Martes y Jueves: 10:00 - 14:00',
      materials: ['Carton', 'Electronicos', 'Vidrio'],
      open: false,
    },
  ];
}
