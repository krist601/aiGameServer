import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { Achievement } from '../../../domain/achievement/achievement.entity';

@Schema({ collection: 'achievements', timestamps: true })
export class AchievementDocument implements Achievement {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop()
  effect?: string;

  @Prop()
  icon?: string;

  @Prop({
    required: true,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common',
  })
  rarity!: 'common' | 'rare' | 'epic' | 'legendary';
}

export type AchievementHydratedDocument = HydratedDocument<AchievementDocument>;
export const AchievementSchema =
  SchemaFactory.createForClass(AchievementDocument);

