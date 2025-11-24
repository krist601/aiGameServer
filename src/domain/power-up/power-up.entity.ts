export interface PowerUp {
  id?: string;
  name: string;
  description?: string;
  value: number;
  type: 'temporary' | 'permanent';
  duration_seconds?: number;
  created_at?: Date;
  updated_at?: Date;
}

