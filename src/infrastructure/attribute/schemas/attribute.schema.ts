import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { Attribute } from '../../../domain/attribute/attribute.entity';

@Schema({ collection: 'attributes', timestamps: true })
export class AttributeDocument implements Attribute {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({
    required: true,
    enum: ['energy', 'money', 'mana', 'health', 'level', 'custom'],
  })
  type!: 'energy' | 'money' | 'mana' | 'health' | 'level' | 'custom';

  @Prop()
  default_value?: number;

  @Prop()
  min_value?: number;

  @Prop()
  max_value?: number;
}

export type AttributeHydratedDocument = HydratedDocument<AttributeDocument>;
export const AttributeSchema = SchemaFactory.createForClass(AttributeDocument);

AttributeSchema.index({ name: 1 }, { unique: true });

