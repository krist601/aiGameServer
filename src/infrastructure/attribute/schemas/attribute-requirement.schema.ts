import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import type { AttributeRequirement } from '../../../domain/attribute/attribute-requirement.entity';

@Schema({ collection: 'attribute_requirements', timestamps: true })
export class AttributeRequirementDocument implements AttributeRequirement {
  @Prop({ required: true, type: String, ref: 'DecisionOptionDocument' })
  decision_option_id!: string;

  @Prop({ required: true })
  attribute_name!: string;

  @Prop()
  level_required?: number;

  @Prop()
  health_required?: number;

  @Prop()
  energy_required?: number;

  @Prop()
  mana_required?: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  custom_requirement?: Record<string, unknown>;
}

export type AttributeRequirementHydratedDocument =
  HydratedDocument<AttributeRequirementDocument>;
export const AttributeRequirementSchema = SchemaFactory.createForClass(
  AttributeRequirementDocument,
);

AttributeRequirementSchema.index({ decision_option_id: 1 });

