import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class FranchiseDocument extends Document {
  @Prop({ required: true, unique: true })
  franchise_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  author?: string;

  @Prop({ type: [String], default: [] })
  genre?: string[];

  @Prop()
  cover_image?: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const FranchiseSchema = SchemaFactory.createForClass(FranchiseDocument);
