import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { StoryStage } from '../../../domain/story/story-stage.entity';

@Schema({ collection: 'story_stages', timestamps: true })
export class StoryStageDocument implements StoryStage {
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

  @Prop({ default: false })
  is_canonical_progress!: boolean;

  @Prop()
  canonical_event?: string;

  @Prop()
  chapter?: string;
}

export type StoryStageHydratedDocument = HydratedDocument<StoryStageDocument>;
export const StoryStageSchema = SchemaFactory.createForClass(StoryStageDocument);

StoryStageSchema.index({ chapter: 1 });
StoryStageSchema.index({ is_canonical_progress: 1 });

