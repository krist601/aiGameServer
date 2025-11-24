import { Body, Controller, Param, Post } from '@nestjs/common';
import type { Inventory } from '../../../domain/inventory/inventory.entity';
import { AddItemToInventoryUseCase } from '../../../application/inventory/use-cases/add-item-to-inventory.use-case';
import { RemoveItemFromInventoryUseCase } from '../../../application/inventory/use-cases/remove-item-from-inventory.use-case';
import { UseItemUseCase } from '../../../application/inventory/use-cases/use-item.use-case';

@Controller('player/:id/inventory')
export class InventoryController {
  constructor(
    private readonly addItemToInventoryUseCase: AddItemToInventoryUseCase,
    private readonly removeItemFromInventoryUseCase: RemoveItemFromInventoryUseCase,
    private readonly useItemUseCase: UseItemUseCase,
  ) {}

  @Post('add')
  async addItem(
    @Param('id') playerId: string,
    @Body() body: { item_id: string; quantity?: number },
  ): Promise<Inventory> {
    return this.addItemToInventoryUseCase.execute(
      playerId,
      body.item_id,
      body.quantity,
    );
  }

  @Post('remove')
  async removeItem(
    @Param('id') playerId: string,
    @Body() body: { item_id: string; quantity?: number },
  ): Promise<Inventory> {
    return this.removeItemFromInventoryUseCase.execute(
      playerId,
      body.item_id,
      body.quantity,
    );
  }

  @Post('use')
  async useItem(
    @Param('id') playerId: string,
    @Body() body: { item_id: string },
  ): Promise<{ inventory: Inventory; effectsApplied: boolean }> {
    return this.useItemUseCase.execute(playerId, body.item_id);
  }
}

