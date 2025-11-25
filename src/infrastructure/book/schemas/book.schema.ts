import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BookDocument extends Document {
  @Prop({ required: true, unique: true })
  book_id: string;

  @Prop({ required: true, index: true })
  franchise_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  volume_number: number;

  @Prop()
  cover_image?: string;

  @Prop({ default: false })
  is_published: boolean;

  @Prop()
  estimated_duration?: number;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const BookSchema = SchemaFactory.createForClass(BookDocument);
