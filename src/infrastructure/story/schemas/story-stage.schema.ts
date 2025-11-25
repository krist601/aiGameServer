import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { StoryStage } from '../../../domain/story/story-stage.entity';

@Schema({ collection: 'story_stages', timestamps: true })
export class StoryStageDocument implements StoryStage {
  @Prop({ required: true, index: true })
  chapter_id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  scene!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  sub_title!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: true })
  question!: string;

  @Prop({ required: true, default: 0 })
  stage_order!: number;

  @Prop({ default: false })
  is_canonical_progress!: boolean;

  @Prop()
  canonical_event?: string;
}

export type StoryStageHydratedDocument = HydratedDocument<StoryStageDocument>;
export const StoryStageSchema = SchemaFactory.createForClass(StoryStageDocument);

StoryStageSchema.index({ chapter_id: 1 });
StoryStageSchema.index({ chapter_id: 1, stage_order: 1 });
StoryStageSchema.index({ is_canonical_progress: 1 });

