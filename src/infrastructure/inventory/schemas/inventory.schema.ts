import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import type { Inventory, InventoryItem } from '../../../domain/inventory/inventory.entity';

const InventoryItemSchema = new MongooseSchema(
  {
    item_id: { type: String, required: true, ref: 'ItemDocument' },
    quantity: { type: Number, required: true, min: 1 },
    acquired_at: { type: Date, required: true, default: Date.now },
  },
  { _id: false },
);

@Schema({ collection: 'inventories', timestamps: true })
export class InventoryDocument implements Inventory {
  @Prop({ required: true, unique: true })
  player_id!: string;

  @Prop({ type: [InventoryItemSchema], default: [] })
  items!: InventoryItem[];

  @Prop()
  max_slots?: number;
}

export type InventoryHydratedDocument = HydratedDocument<InventoryDocument>;
export const InventorySchema = SchemaFactory.createForClass(InventoryDocument);

InventorySchema.index({ player_id: 1 }, { unique: true });

