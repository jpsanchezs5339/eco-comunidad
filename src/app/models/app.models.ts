export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Session {
  email: string;
  name: string;
  lastLogin: string;
}

export interface MaterialSummary {
  material: string;
  kg: number;
  unitHint: string;
}

export interface ScanRecord {
  id: string;
  material: string;
  confidence: number;
  scannedAt: string;
}

export interface ImpactStats {
  totalKg: number;
  totalItems: number;
  points: number;
  co2KgSaved: number;
  waterLitersSaved: number;
  materials: MaterialSummary[];
  history: ScanRecord[];
}
