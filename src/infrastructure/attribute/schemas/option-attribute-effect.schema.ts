import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import type { OptionAttributeEffect } from '../../../domain/attribute/option-attribute-effect.entity';

@Schema({ collection: 'option_attribute_effects', timestamps: true })
export class OptionAttributeEffectDocument implements OptionAttributeEffect {
  @Prop({ required: true, type: String, ref: 'DecisionOptionDocument' })
  decision_option_id!: string;

  @Prop({ required: true })
  attribute_name!: string;

  @Prop()
  description?: string;

  @Prop()
  energy_effect?: number;

  @Prop()
  money_effect?: number;

  @Prop()
  mana_effect?: number;

  @Prop()
  health_effect?: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  custom_effect?: Record<string, unknown>;
}

export type OptionAttributeEffectHydratedDocument =
  HydratedDocument<OptionAttributeEffectDocument>;
export const OptionAttributeEffectSchema = SchemaFactory.createForClass(
  OptionAttributeEffectDocument,
);

OptionAttributeEffectSchema.index({ decision_option_id: 1 });
OptionAttributeEffectSchema.index({ attribute_name: 1 });

