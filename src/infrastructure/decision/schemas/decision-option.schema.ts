import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import type { DecisionOption } from '../../../domain/decision/decision-option.entity';

@Schema({ collection: 'decision_options', timestamps: true })
export class DecisionOptionDocument implements DecisionOption {
  @Prop({ required: true, type: String, ref: 'DecisionDocument' })
  decision_id!: string;

  @Prop({ required: true, enum: ['dialogue', 'action', 'choice'] })
  type!: 'dialogue' | 'action' | 'choice';

  @Prop({ required: true })
  text!: string;

  @Prop()
  result_text?: string;

  @Prop({ type: String, ref: 'StoryStageDocument' })
  next_stage_id?: string;

  @Prop()
  next_scene?: string;

  @Prop()
  canonical_target_order?: number;

  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  attribute_effects?: any[];

  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  attribute_requirements?: any[];
}

export type DecisionOptionHydratedDocument =
  HydratedDocument<DecisionOptionDocument>;
export const DecisionOptionSchema =
  SchemaFactory.createForClass(DecisionOptionDocument);

DecisionOptionSchema.index({ decision_id: 1 });
DecisionOptionSchema.index({ next_stage_id: 1 });

