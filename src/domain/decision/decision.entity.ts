import type { DecisionOption } from './decision-option.entity';

export interface Decision {
  id?: string;
  story_stage_id: string;
  description: string;
  requirement?: string;
  options: DecisionOption[];
  created_at?: Date;
  updated_at?: Date;
}

