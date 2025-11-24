import type { FriendChallenge } from '../../../domain/friend-challenge/friend-challenge.entity';

export interface FriendChallengePort {
  create(challenge: FriendChallenge): Promise<FriendChallenge>;
  findById(id: string): Promise<FriendChallenge | null>;
  findByPlayerId(playerId: string): Promise<FriendChallenge[]>;
  update(id: string, challenge: Partial<FriendChallenge>): Promise<FriendChallenge>;
}

export const FRIEND_CHALLENGE_PORT = Symbol('FRIEND_CHALLENGE_PORT');

