import type { Item } from '../item/item.entity';

export interface InventoryItem {
  item_id: string;
  quantity: number;
  acquired_at: Date;
}

export interface Inventory {
  id?: string;
  player_id: string;
  items: InventoryItem[];
  max_slots?: number;
  created_at?: Date;
  updated_at?: Date;
}

