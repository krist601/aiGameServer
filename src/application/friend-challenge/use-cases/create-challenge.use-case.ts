import { Inject, Injectable } from '@nestjs/common';
import type { FriendChallenge } from '../../../domain/friend-challenge/friend-challenge.entity';
import {
  FRIEND_CHALLENGE_PORT,
  type FriendChallengePort,
} from '../ports/friend-challenge.port';

@Injectable()
export class CreateChallengeUseCase {
  constructor(
    @Inject(FRIEND_CHALLENGE_PORT)
    private readonly friendChallengePort: FriendChallengePort,
  ) {}

  async execute(challenge: FriendChallenge): Promise<FriendChallenge> {
    return this.friendChallengePort.create(challenge);
  }
}

