import type { Inventory } from '../../../domain/inventory/inventory.entity';

export interface InventoryPort {
  findByPlayerId(playerId: string): Promise<Inventory | null>;
  create(inventory: Inventory): Promise<Inventory>;
  update(id: string, inventory: Partial<Inventory>): Promise<Inventory>;
}

export const INVENTORY_PORT = Symbol('INVENTORY_PORT');

