import { Inject, Injectable } from '@nestjs/common';
import type { PowerUp } from '../../../domain/power-up/power-up.entity';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import { POWER_UP_PORT, type PowerUpPort } from '../ports/power-up.port';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class GrantPowerUpUseCase {
  constructor(
    @Inject(POWER_UP_PORT)
    private readonly powerUpPort: PowerUpPort,
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(
    playerId: string,
    powerUpId: string,
  ): Promise<PlayerSave> {
    const powerUp = await this.powerUpPort.findById(powerUpId);
    if (!powerUp) {
      throw new Error(`Power-up ${powerUpId} not found`);
    }

    let playerSave = await this.playerSavePort.findByPlayerId(playerId);
    if (!playerSave) {
      throw new Error(`Player save for ${playerId} not found`);
    }

    const expiresAt = new Date();
    if (powerUp.duration_seconds) {
      expiresAt.setSeconds(expiresAt.getSeconds() + powerUp.duration_seconds);
    } else {
      expiresAt.setFullYear(expiresAt.getFullYear() + 100); // Permanent
    }

    playerSave.active_power_ups.push({
      power_up_id: powerUpId,
      expires_at: expiresAt,
    });

    return this.playerSavePort.update(playerSave.id!, playerSave);
  }
}

