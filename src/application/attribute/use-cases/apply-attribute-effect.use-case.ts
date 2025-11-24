import { Inject, Injectable } from '@nestjs/common';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import type { OptionAttributeEffect } from '../../../domain/attribute/option-attribute-effect.entity';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class ApplyAttributeEffectUseCase {
  constructor(
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(
    playerId: string,
    effects: OptionAttributeEffect[],
  ): Promise<PlayerSave> {
    let playerSave = await this.playerSavePort.findByPlayerId(playerId);
    if (!playerSave) {
      throw new Error(`Player save for ${playerId} not found`);
    }

    const updatedAttributes = { ...playerSave.attributes_state };
    for (const effect of effects) {
      const currentValue = updatedAttributes[effect.attribute_name] || 0;
      updatedAttributes[effect.attribute_name] =
        currentValue +
        (effect.energy_effect ||
          effect.money_effect ||
          effect.mana_effect ||
          effect.health_effect ||
          0);
    }

    playerSave.attributes_state = updatedAttributes;
    return this.playerSavePort.update(playerSave.id!, playerSave);
  }
}

