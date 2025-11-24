import { Inject, Injectable } from '@nestjs/common';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class ConsumePowerUpUseCase {
  constructor(
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(playerId: string, powerUpId: string): Promise<PlayerSave> {
    const playerSave = await this.playerSavePort.findByPlayerId(playerId);
    if (!playerSave) {
      throw new Error(`Player save for ${playerId} not found`);
    }

    playerSave.active_power_ups = playerSave.active_power_ups.filter(
      (pu) => pu.power_up_id !== powerUpId,
    );

    return this.playerSavePort.update(playerSave.id!, playerSave);
  }
}

