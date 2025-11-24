import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { Item } from '../../../domain/item/item.entity';

@Schema({ collection: 'items', timestamps: true })
export class ItemDocument implements Item {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  value!: number;

  @Prop({
    required: true,
    enum: ['consumable', 'equipment', 'quest', 'currency'],
  })
  type!: 'consumable' | 'equipment' | 'quest' | 'currency';

  @Prop({ enum: ['common', 'rare', 'epic', 'legendary'] })
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';

  @Prop({ default: true })
  stackable!: boolean;

  @Prop()
  max_stack?: number;
}

export type ItemHydratedDocument = HydratedDocument<ItemDocument>;
export const ItemSchema = SchemaFactory.createForClass(ItemDocument);

