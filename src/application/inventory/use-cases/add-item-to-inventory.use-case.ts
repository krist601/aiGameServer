import { Inject, Injectable } from '@nestjs/common';
import type { Inventory } from '../../../domain/inventory/inventory.entity';
import { INVENTORY_PORT, type InventoryPort } from '../ports/inventory.port';

@Injectable()
export class AddItemToInventoryUseCase {
  constructor(
    @Inject(INVENTORY_PORT)
    private readonly inventoryPort: InventoryPort,
  ) {}

  async execute(
    playerId: string,
    itemId: string,
    quantity: number = 1,
  ): Promise<Inventory> {
    let inventory = await this.inventoryPort.findByPlayerId(playerId);

    if (!inventory) {
      inventory = await this.inventoryPort.create({
        player_id: playerId,
        items: [],
      });
    }

    const existingItem = inventory.items.find(
      (item) => item.item_id === itemId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      inventory.items.push({
        item_id: itemId,
        quantity,
        acquired_at: new Date(),
      });
    }

    return this.inventoryPort.update(inventory.id!, inventory);
  }
}

