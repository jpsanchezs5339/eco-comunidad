import { Injectable } from '@angular/core';
import { ImpactStats, MaterialSummary, ScanRecord, Session, User } from '../models/app.models';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly usersKey = 'eco_users';
  private readonly sessionKey = 'eco_session';
  private readonly statsKey = 'eco_stats';
  private readonly lastScanKey = 'eco_last_scan';

  constructor(private readonly storage: Storage) {}

  register(name: string, email: string, password: string): Session {
    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const existingIndex = users.findIndex((u) => u.email === normalizedEmail);
    const payload: User = {
      name: name.trim() || 'Vecino Eco',
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      users[existingIndex] = payload;
    } else {
      users.push(payload);
    }

    this.storage.setItem(this.usersKey, users);
    return this.createSession(payload.name, payload.email);
  }

  login(email: string, _password: string): Session {
    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const existingUser = users.find((u) => u.email === normalizedEmail);

    if (existingUser) {
      return this.createSession(existingUser.name, existingUser.email);
    }

    const inferredName = normalizedEmail.split('@')[0] || 'Vecino Eco';
    const guestUser: User = {
      name: this.titleCase(inferredName.replace(/[._-]/g, ' ')),
      email: normalizedEmail,
      password: '',
      createdAt: new Date().toISOString(),
    };

    users.push(guestUser);
    this.storage.setItem(this.usersKey, users);
    return this.createSession(guestUser.name, guestUser.email);
  }

  logout(): void {
    this.storage.removeItem(this.sessionKey);
  }

  isAuthenticated(): boolean {
    return this.currentSession() !== null;
  }

  currentSession(): Session | null {
    return this.storage.getItem<Session | null>(this.sessionKey, null);
  }

  getStats(): ImpactStats {
    return this.storage.getItem<ImpactStats>(this.statsKey, this.defaultStats());
  }

  getLastScan(): ScanRecord | null {
    return this.storage.getItem<ScanRecord | null>(this.lastScanKey, null);
  }

  addScan(material: string, confidence: number): ScanRecord {
    const stats = this.getStats();
    const materialKgMap: Record<string, number> = {
      Plastico: 0.35,
      Carton: 0.5,
      Vidrio: 0.42,
      Metal: 0.38,
    };
    const kgValue = materialKgMap[material] ?? 0.3;
    const materialIndex = stats.materials.findIndex((m) => m.material === material);

    if (materialIndex >= 0) {
      stats.materials[materialIndex].kg += kgValue;
    } else {
      const summary: MaterialSummary = {
        material,
        kg: kgValue,
        unitHint: 'Aporte reciente',
      };
      stats.materials.push(summary);
    }

    stats.totalKg += kgValue;
    stats.totalItems += 1;
    stats.points += 1;
    stats.co2KgSaved += kgValue * 2.1;
    stats.waterLitersSaved += kgValue * 11;

    const scan: ScanRecord = {
      id: crypto.randomUUID(),
      material,
      confidence,
      scannedAt: new Date().toISOString(),
    };

    stats.history = [scan, ...stats.history].slice(0, 30);

    this.storage.setItem(this.statsKey, stats);
    this.storage.setItem(this.lastScanKey, scan);
    return scan;
  }

  private createSession(name: string, email: string): Session {
    const session: Session = {
      name,
      email,
      lastLogin: new Date().toISOString(),
    };
    this.storage.setItem(this.sessionKey, session);
    return session;
  }

  private getUsers(): User[] {
    return this.storage.getItem<User[]>(this.usersKey, []);
  }

  private defaultStats(): ImpactStats {
    return {
      totalKg: 1248,
      totalItems: 1450,
      points: 84,
      co2KgSaved: 256,
      waterLitersSaved: 2400,
      materials: [
        { material: 'Plastico', kg: 452, unitHint: '2.300 botellas PET' },
        { material: 'Carton', kg: 581, unitHint: 'Aprox. 9 arboles adultos' },
        { material: 'Vidrio', kg: 215, unitHint: 'Reciclable infinitamente' },
      ],
      history: [],
    };
  }

  private titleCase(value: string): string {
    return value
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ');
  }
}
