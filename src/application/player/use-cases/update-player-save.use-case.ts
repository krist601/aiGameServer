import { Inject, Injectable } from '@nestjs/common';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../ports/player-save.port';

@Injectable()
export class UpdatePlayerSaveUseCase {
  constructor(
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(
    id: string,
    save: Partial<PlayerSave>,
  ): Promise<PlayerSave> {
    return this.playerSavePort.update(id, save);
  }
}

