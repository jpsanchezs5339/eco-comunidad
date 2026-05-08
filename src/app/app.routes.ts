import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { DropoffPoints } from './pages/dropoff-points/dropoff-points';
import { Home } from './pages/home/home';
import { Impact } from './pages/impact/impact';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Scan } from './pages/scan/scan';
import { ScanSuccess } from './pages/scan-success/scan-success';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: Login },
	{ path: 'registro', component: Register },
	{ path: 'inicio', component: Home, canActivate: [authGuard] },
	{ path: 'escanear', component: Scan, canActivate: [authGuard] },
	{ path: 'escaneo-exitoso', component: ScanSuccess, canActivate: [authGuard] },
	{ path: 'impacto', component: Impact, canActivate: [authGuard] },
	{ path: 'puntos-entrega', component: DropoffPoints, canActivate: [authGuard] },
	{ path: '**', redirectTo: 'login' }
];
