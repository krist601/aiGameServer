import { Inject, Injectable } from '@nestjs/common';
import type { FriendChallenge } from '../../../domain/friend-challenge/friend-challenge.entity';
import {
  FRIEND_CHALLENGE_PORT,
  type FriendChallengePort,
} from '../ports/friend-challenge.port';

@Injectable()
export class AcceptChallengeUseCase {
  constructor(
    @Inject(FRIEND_CHALLENGE_PORT)
    private readonly friendChallengePort: FriendChallengePort,
  ) {}

  async execute(challengeId: string): Promise<FriendChallenge> {
    const challenge = await this.friendChallengePort.findById(challengeId);
    if (!challenge) {
      throw new Error(`Challenge ${challengeId} not found`);
    }

    if (challenge.status !== 'pending') {
      throw new Error('Challenge is not pending');
    }

    return this.friendChallengePort.update(challengeId, {
      status: 'accepted',
      accepted_at: new Date(),
    });
  }
}

