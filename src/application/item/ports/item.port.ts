import type { Item } from '../../../domain/item/item.entity';

export interface ItemPort {
  create(item: Item): Promise<Item>;
  findById(id: string): Promise<Item | null>;
  findAll(): Promise<Item[]>;
}

export const ITEM_PORT = Symbol('ITEM_PORT');

