import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { Decision } from '../../../domain/decision/decision.entity';

@Schema({ collection: 'decisions', timestamps: true })
export class DecisionDocument implements Decision {
  @Prop({ required: true, type: String, ref: 'StoryStageDocument' })
  story_stage_id!: string;

  @Prop({ required: true })
  description!: string;

  @Prop()
  requirement?: string;

  @Prop({ type: Array, default: [] })
  options!: any[];
}

export type DecisionHydratedDocument = HydratedDocument<DecisionDocument>;
export const DecisionSchema = SchemaFactory.createForClass(DecisionDocument);

DecisionSchema.index({ story_stage_id: 1 });

