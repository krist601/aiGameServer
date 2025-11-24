import { Inject, Injectable } from '@nestjs/common';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../ports/player-save.port';

@Injectable()
export class ResetPlayerSaveUseCase {
  constructor(
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(playerId: string): Promise<PlayerSave> {
    const existingSave = await this.playerSavePort.findByPlayerId(playerId);
    if (existingSave) {
      await this.playerSavePort.delete(existingSave.id!);
    }

    const newSave: PlayerSave = {
      player_id: playerId,
      attributes_state: {},
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    return this.playerSavePort.create(newSave);
  }
}

