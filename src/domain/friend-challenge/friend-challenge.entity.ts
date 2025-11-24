export interface FriendChallenge {
  id?: string;
  player_id: string;
  opponent_id: string;
  challenge_text: string;
  reward?: string;
  status: 'pending' | 'accepted' | 'completed' | 'failed' | 'expired';
  created_at?: Date;
  accepted_at?: Date;
  resolved_at?: Date;
  expires_at?: Date;
}

