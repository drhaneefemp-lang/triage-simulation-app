export type TriageLevel = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN';

export interface Vitals {
  hr: number;
  sbp: number;
  dbp: number;
  spo2: number;
  grbs: number;
  rr: number;
  temp: number;
}

export interface PatientScenario {
  id: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  complaint: string;
  vitals: Vitals;
  correctTriage: TriageLevel;
  explanation: string;
}

export interface GameState {
  status: 'playing' | 'feedback' | 'loading' | 'error';
  score: number;
  streak: number;
  currentScenario: PatientScenario | null;
  userChoice: TriageLevel | null;
  error?: string;
}
