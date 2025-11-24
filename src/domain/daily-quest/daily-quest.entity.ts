export interface DailyQuest {
  id?: string;
  name: string;
  description?: string;
  objective: string;
  reward_type: 'item' | 'attribute' | 'currency' | 'achievement';
  reward_value: number;
  reward_item_id?: string;
  is_completed: boolean;
  is_claimed: boolean;
  expires_at: Date;
  created_at?: Date;
  updated_at?: Date;
}

