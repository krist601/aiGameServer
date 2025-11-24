import { Inject, Injectable } from '@nestjs/common';
import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import {
  CANONICAL_EVENT_PORT,
  type CanonicalEventPort,
} from '../ports/canonical-event.port';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class TriggerCanonicalEventUseCase {
  constructor(
    @Inject(CANONICAL_EVENT_PORT)
    private readonly canonicalEventPort: CanonicalEventPort,
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(
    eventId: string,
    playerId: string,
  ): Promise<{ event: CanonicalEvent; playerSave: PlayerSave }> {
    const event = await this.canonicalEventPort.findById(eventId);
    if (!event) {
      throw new Error(`Canonical event ${eventId} not found`);
    }

    // Check if requirements are met
    if (event.required_stages && event.required_stages.length > 0) {
      const playerSave = await this.playerSavePort.findByPlayerId(playerId);
      if (!playerSave) {
        throw new Error(`Player save for ${playerId} not found`);
      }

      const hasAllStages = event.required_stages.every((stageId) =>
        playerSave.unlocked_canonical_events.includes(stageId),
      );
      if (!hasAllStages) {
        throw new Error('Required stages not completed');
      }
    }

    // Unlock the event
    const updatedEvent = await this.canonicalEventPort.update(eventId, {
      is_unlocked: true,
      unlocked_at: new Date(),
    });

    // Update player save
    let playerSave = await this.playerSavePort.findByPlayerId(playerId);
    if (!playerSave) {
      throw new Error(`Player save for ${playerId} not found`);
    }

    if (!playerSave.unlocked_canonical_events.includes(eventId)) {
      playerSave.unlocked_canonical_events.push(eventId);
      playerSave = await this.playerSavePort.update(
        playerSave.id!,
        playerSave,
      );
    }

    return { event: updatedEvent, playerSave };
  }
}

