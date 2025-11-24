import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import type {
  Branch,
  StoryOption,
} from '../../../domain/story/branch.entity';

@Schema({ collection: 'story_branches' })
export class StoryBranchDocument implements Branch {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  sub_title!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  option!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: true })
  question!: string;

  @Prop({
    type: [MongooseSchema.Types.Mixed],
    default: [],
  })
  options!: StoryOption[];
}

export type StoryBranchHydratedDocument = HydratedDocument<StoryBranchDocument>;
export const StoryBranchSchema = SchemaFactory.createForClass(StoryBranchDocument);

