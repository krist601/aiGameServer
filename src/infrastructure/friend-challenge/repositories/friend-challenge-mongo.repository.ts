import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { FriendChallenge } from '../../../domain/friend-challenge/friend-challenge.entity';
import {
  FRIEND_CHALLENGE_PORT,
  type FriendChallengePort,
} from '../../../application/friend-challenge/ports/friend-challenge.port';
import {
  FriendChallengeDocument,
  FriendChallengeHydratedDocument,
} from '../schemas/friend-challenge.schema';

@Injectable()
export class FriendChallengeMongoRepository implements FriendChallengePort {
  constructor(
    @InjectModel(FriendChallengeDocument.name)
    private readonly challengeModel: Model<FriendChallengeHydratedDocument>,
  ) {}

  async create(challenge: FriendChallenge): Promise<FriendChallenge> {
    const created = new this.challengeModel(challenge);
    return created.save();
  }

  async findById(id: string): Promise<FriendChallenge | null> {
    return this.challengeModel.findById(id).lean<FriendChallenge>().exec();
  }

  async findByPlayerId(playerId: string): Promise<FriendChallenge[]> {
    return this.challengeModel
      .find({
        $or: [{ player_id: playerId }, { opponent_id: playerId }],
      })
      .lean<FriendChallenge[]>()
      .exec();
  }

  async update(
    id: string,
    challenge: Partial<FriendChallenge>,
  ): Promise<FriendChallenge> {
    const updated = await this.challengeModel
      .findByIdAndUpdate(id, challenge, { new: true })
      .lean<FriendChallenge>()
      .exec();
    if (!updated) {
      throw new Error(`Friend challenge ${id} not found`);
    }
    return updated;
  }
}

