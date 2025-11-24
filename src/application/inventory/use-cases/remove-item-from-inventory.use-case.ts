import { Inject, Injectable } from '@nestjs/common';
import type { Inventory } from '../../../domain/inventory/inventory.entity';
import { INVENTORY_PORT, type InventoryPort } from '../ports/inventory.port';

@Injectable()
export class RemoveItemFromInventoryUseCase {
  constructor(
    @Inject(INVENTORY_PORT)
    private readonly inventoryPort: InventoryPort,
  ) {}

  async execute(
    playerId: string,
    itemId: string,
    quantity: number = 1,
  ): Promise<Inventory> {
    const inventory = await this.inventoryPort.findByPlayerId(playerId);
    if (!inventory) {
      throw new Error(`Inventory for player ${playerId} not found`);
    }

    const itemIndex = inventory.items.findIndex(
      (item) => item.item_id === itemId,
    );
    if (itemIndex === -1) {
      throw new Error(`Item ${itemId} not found in inventory`);
    }

    const item = inventory.items[itemIndex];
    if (item.quantity < quantity) {
      throw new Error(`Insufficient quantity. Available: ${item.quantity}`);
    }

    item.quantity -= quantity;
    if (item.quantity <= 0) {
      inventory.items.splice(itemIndex, 1);
    }

    return this.inventoryPort.update(inventory.id!, inventory);
  }
}

