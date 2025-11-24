import { Inject, Injectable } from '@nestjs/common';
import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';
import {
  CANONICAL_EVENT_PORT,
  type CanonicalEventPort,
} from '../ports/canonical-event.port';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class GetCanonicalProgressUseCase {
  constructor(
    @Inject(CANONICAL_EVENT_PORT)
    private readonly canonicalEventPort: CanonicalEventPort,
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(playerId: string): Promise<{
    events: CanonicalEvent[];
    unlocked: string[];
    progress: number;
  }> {
    const events = await this.canonicalEventPort.findAll();
    const playerSave = await this.playerSavePort.findByPlayerId(playerId);

    const unlocked = playerSave?.unlocked_canonical_events || [];
    const progress =
      events.length > 0 ? (unlocked.length / events.length) * 100 : 0;

    return {
      events,
      unlocked,
      progress: Math.round(progress),
    };
  }
}

