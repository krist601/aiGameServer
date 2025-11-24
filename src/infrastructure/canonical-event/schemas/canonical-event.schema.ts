import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';

@Schema({ collection: 'canonical_events', timestamps: true })
export class CanonicalEventDocument implements CanonicalEvent {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ type: String, ref: 'StoryStageDocument' })
  trigger_stage_id?: string;

  @Prop({ type: [String], default: [] })
  required_stages?: string[];

  @Prop({ required: true })
  order!: number;

  @Prop({ default: false })
  is_unlocked!: boolean;

  @Prop()
  unlocked_at?: Date;
}

export type CanonicalEventHydratedDocument =
  HydratedDocument<CanonicalEventDocument>;
export const CanonicalEventSchema = SchemaFactory.createForClass(
  CanonicalEventDocument,
);

CanonicalEventSchema.index({ trigger_stage_id: 1 });
CanonicalEventSchema.index({ order: 1 });

