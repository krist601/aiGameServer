export interface PlayerAttributeState {
  [attributeName: string]: number;
}

export interface PlayerSave {
  id?: string;
  player_id: string;
  current_stage_id?: string;
  current_scene?: string;
  attributes_state: PlayerAttributeState;
  unlocked_canonical_events: string[];
  active_power_ups: Array<{
    power_up_id: string;
    expires_at: Date;
  }>;
  completed_achievements: string[];
  last_played_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

