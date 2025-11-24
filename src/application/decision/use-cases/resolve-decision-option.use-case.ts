import { Inject, Injectable } from '@nestjs/common';
import type { DecisionOption } from '../../../domain/decision/decision-option.entity';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import {
  DECISION_OPTION_PORT,
  type DecisionOptionPort,
} from '../ports/decision-option.port';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class ResolveDecisionOptionUseCase {
  constructor(
    @Inject(DECISION_OPTION_PORT)
    private readonly decisionOptionPort: DecisionOptionPort,
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(
    optionId: string,
    playerId: string,
  ): Promise<{ option: DecisionOption; updatedSave: PlayerSave }> {
    const option = await this.decisionOptionPort.findById(optionId);
    if (!option) {
      throw new Error(`Decision option ${optionId} not found`);
    }

    let playerSave = await this.playerSavePort.findByPlayerId(playerId);
    if (!playerSave) {
      throw new Error(`Player save for ${playerId} not found`);
    }

    // Apply attribute effects
    if (option.attribute_effects) {
      const updatedAttributes = { ...playerSave.attributes_state };
      for (const effect of option.attribute_effects) {
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
    }

    // Update current stage if next_stage_id is provided
    if (option.next_stage_id) {
      playerSave.current_stage_id = option.next_stage_id;
    }
    if (option.next_scene) {
      playerSave.current_scene = option.next_scene;
    }

    playerSave.last_played_at = new Date();
    const updatedSave = await this.playerSavePort.update(
      playerSave.id!,
      playerSave,
    );

    return { option, updatedSave };
  }
}

