export interface Achievement {
  id?: string;
  name: string;
  description?: string;
  effect?: string;
  icon?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  created_at?: Date;
  updated_at?: Date;
}

