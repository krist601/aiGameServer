import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ChapterDocument extends Document {
  @Prop({ required: true, unique: true })
  chapter_id: string;

  @Prop({ required: true, index: true })
  book_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  chapter_number: number;

  @Prop({ default: false })
  is_unlocked_by_default: boolean;

  @Prop({ type: Object })
  unlock_requirements?: {
    previous_chapter_id?: string;
    required_canonical_events?: string[];
    required_attributes?: Record<string, number>;
  };

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const ChapterSchema = SchemaFactory.createForClass(ChapterDocument);
