import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { DailyQuest } from '../../../domain/daily-quest/daily-quest.entity';

@Schema({ collection: 'daily_quests', timestamps: true })
export class DailyQuestDocument implements DailyQuest {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  objective!: string;

  @Prop({
    required: true,
    enum: ['item', 'attribute', 'currency', 'achievement'],
  })
  reward_type!: 'item' | 'attribute' | 'currency' | 'achievement';

  @Prop({ required: true })
  reward_value!: number;

  @Prop({ type: String, ref: 'ItemDocument' })
  reward_item_id?: string;

  @Prop({ default: false })
  is_completed!: boolean;

  @Prop({ default: false })
  is_claimed!: boolean;

  @Prop({ required: true })
  expires_at!: Date;
}

export type DailyQuestHydratedDocument =
  HydratedDocument<DailyQuestDocument>;
export const DailyQuestSchema = SchemaFactory.createForClass(DailyQuestDocument);

DailyQuestSchema.index({ expires_at: 1 });
DailyQuestSchema.index({ is_completed: 1, is_claimed: 1 });

