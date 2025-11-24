import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import type {
  PlayerSave,
  PlayerAttributeState,
} from '../../../domain/player/player-save.entity';

const ActivePowerUpSchema = new MongooseSchema(
  {
    power_up_id: { type: String, required: true, ref: 'PowerUpDocument' },
    expires_at: { type: Date, required: true },
  },
  { _id: false },
);

@Schema({ collection: 'player_saves', timestamps: true })
export class PlayerSaveDocument implements PlayerSave {
  @Prop({ required: true, unique: true })
  player_id!: string;

  @Prop({ type: String, ref: 'StoryStageDocument' })
  current_stage_id?: string;

  @Prop()
  current_scene?: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  attributes_state!: PlayerAttributeState;

  @Prop({ type: [String], default: [] })
  unlocked_canonical_events!: string[];

  @Prop({ type: [ActivePowerUpSchema], default: [] })
  active_power_ups!: Array<{
    power_up_id: string;
    expires_at: Date;
  }>;

  @Prop({ type: [String], default: [] })
  completed_achievements!: string[];

  @Prop()
  last_played_at?: Date;
}

export type PlayerSaveHydratedDocument = HydratedDocument<PlayerSaveDocument>;
export const PlayerSaveSchema = SchemaFactory.createForClass(PlayerSaveDocument);

PlayerSaveSchema.index({ player_id: 1 }, { unique: true });
PlayerSaveSchema.index({ current_stage_id: 1 });

