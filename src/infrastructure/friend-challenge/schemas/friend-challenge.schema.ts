import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { FriendChallenge } from '../../../domain/friend-challenge/friend-challenge.entity';

@Schema({ collection: 'friend_challenges', timestamps: true })
export class FriendChallengeDocument implements FriendChallenge {
  @Prop({ required: true })
  player_id!: string;

  @Prop({ required: true })
  opponent_id!: string;

  @Prop({ required: true })
  challenge_text!: string;

  @Prop()
  reward?: string;

  @Prop({
    required: true,
    enum: ['pending', 'accepted', 'completed', 'failed', 'expired'],
    default: 'pending',
  })
  status!: 'pending' | 'accepted' | 'completed' | 'failed' | 'expired';

  @Prop()
  accepted_at?: Date;

  @Prop()
  resolved_at?: Date;

  @Prop()
  expires_at?: Date;
}

export type FriendChallengeHydratedDocument =
  HydratedDocument<FriendChallengeDocument>;
export const FriendChallengeSchema = SchemaFactory.createForClass(
  FriendChallengeDocument,
);

FriendChallengeSchema.index({ player_id: 1 });
FriendChallengeSchema.index({ opponent_id: 1 });
FriendChallengeSchema.index({ status: 1 });

