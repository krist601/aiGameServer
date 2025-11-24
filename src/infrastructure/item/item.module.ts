import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ITEM_PORT } from '../../application/item/ports/item.port';
import { ItemMongoRepository } from './repositories/item-mongo.repository';
import { ItemDocument, ItemSchema } from './schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemDocument.name, schema: ItemSchema },
    ]),
  ],
  providers: [
    ItemMongoRepository,
    {
      provide: ITEM_PORT,
      useClass: ItemMongoRepository,
    },
  ],
  exports: [ITEM_PORT],
})
export class ItemModule {}

