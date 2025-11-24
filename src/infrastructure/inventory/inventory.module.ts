import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryController } from './controllers/inventory.controller';
import { AddItemToInventoryUseCase } from '../../application/inventory/use-cases/add-item-to-inventory.use-case';
import { RemoveItemFromInventoryUseCase } from '../../application/inventory/use-cases/remove-item-from-inventory.use-case';
import { UseItemUseCase } from '../../application/inventory/use-cases/use-item.use-case';
import { INVENTORY_PORT } from '../../application/inventory/ports/inventory.port';
import { InventoryMongoRepository } from './repositories/inventory-mongo.repository';
import {
  InventoryDocument,
  InventorySchema,
} from './schemas/inventory.schema';
import { PlayerModule } from '../player/player.module';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InventoryDocument.name, schema: InventorySchema },
    ]),
    PlayerModule,
    ItemModule,
  ],
  controllers: [InventoryController],
  providers: [
    AddItemToInventoryUseCase,
    RemoveItemFromInventoryUseCase,
    UseItemUseCase,
    InventoryMongoRepository,
    {
      provide: INVENTORY_PORT,
      useClass: InventoryMongoRepository,
    },
  ],
  exports: [INVENTORY_PORT],
})
export class InventoryModule {}

