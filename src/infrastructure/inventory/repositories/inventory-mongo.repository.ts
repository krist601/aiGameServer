import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Inventory } from '../../../domain/inventory/inventory.entity';
import {
  INVENTORY_PORT,
  type InventoryPort,
} from '../../../application/inventory/ports/inventory.port';
import {
  InventoryDocument,
  InventoryHydratedDocument,
} from '../schemas/inventory.schema';

@Injectable()
export class InventoryMongoRepository implements InventoryPort {
  constructor(
    @InjectModel(InventoryDocument.name)
    private readonly inventoryModel: Model<InventoryHydratedDocument>,
  ) {}

  async findByPlayerId(playerId: string): Promise<Inventory | null> {
    return this.inventoryModel
      .findOne({ player_id: playerId })
      .lean<Inventory>()
      .exec();
  }

  async create(inventory: Inventory): Promise<Inventory> {
    const created = new this.inventoryModel(inventory);
    return created.save();
  }

  async update(
    id: string,
    inventory: Partial<Inventory>,
  ): Promise<Inventory> {
    const updated = await this.inventoryModel
      .findByIdAndUpdate(id, inventory, { new: true })
      .lean<Inventory>()
      .exec();
    if (!updated) {
      throw new Error(`Inventory ${id} not found`);
    }
    return updated;
  }
}

