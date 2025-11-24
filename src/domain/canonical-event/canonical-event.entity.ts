export interface CanonicalEvent {
  id?: string;
  name: string;
  description?: string;
  trigger_stage_id?: string;
  required_stages?: string[];
  order: number;
  is_unlocked: boolean;
  unlocked_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

