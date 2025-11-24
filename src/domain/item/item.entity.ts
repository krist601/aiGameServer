export interface Item {
  id?: string;
  name: string;
  description?: string;
  value: number;
  type: 'consumable' | 'equipment' | 'quest' | 'currency';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  stackable: boolean;
  max_stack?: number;
  created_at?: Date;
  updated_at?: Date;
}

