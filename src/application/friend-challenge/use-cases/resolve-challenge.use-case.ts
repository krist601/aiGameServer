import { Inject, Injectable } from '@nestjs/common';
import type { FriendChallenge } from '../../../domain/friend-challenge/friend-challenge.entity';
import {
  FRIEND_CHALLENGE_PORT,
  type FriendChallengePort,
} from '../ports/friend-challenge.port';

@Injectable()
export class ResolveChallengeUseCase {
  constructor(
    @Inject(FRIEND_CHALLENGE_PORT)
    private readonly friendChallengePort: FriendChallengePort,
  ) {}

  async execute(
    challengeId: string,
    success: boolean,
  ): Promise<FriendChallenge> {
    const challenge = await this.friendChallengePort.findById(challengeId);
    if (!challenge) {
      throw new Error(`Challenge ${challengeId} not found`);
    }

    if (challenge.status !== 'accepted') {
      throw new Error('Challenge must be accepted before resolving');
    }

    return this.friendChallengePort.update(challengeId, {
      status: success ? 'completed' : 'failed',
      resolved_at: new Date(),
    });
  }
}

