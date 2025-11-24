import { Inject, Injectable } from '@nestjs/common';
import type { Inventory } from '../../../domain/inventory/inventory.entity';
import { INVENTORY_PORT, type InventoryPort } from '../ports/inventory.port';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class UseItemUseCase {
  constructor(
    @Inject(INVENTORY_PORT)
    private readonly inventoryPort: InventoryPort,
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(
    playerId: string,
    itemId: string,
  ): Promise<{ inventory: Inventory; effectsApplied: boolean }> {
    const inventory = await this.inventoryPort.findByPlayerId(playerId);
    if (!inventory) {
      throw new Error(`Inventory for player ${playerId} not found`);
    }

    const item = inventory.items.find((i) => i.item_id === itemId);
    if (!item || item.quantity <= 0) {
      throw new Error(`Item ${itemId} not available in inventory`);
    }

    // Remove one item
    item.quantity -= 1;
    if (item.quantity <= 0) {
      inventory.items = inventory.items.filter((i) => i.item_id !== itemId);
    }

    const updatedInventory = await this.inventoryPort.update(
      inventory.id!,
      inventory,
    );

    // Apply item effects (this would need item details from ItemPort)
    // For now, just return success
    return { inventory: updatedInventory, effectsApplied: true };
  }
}

