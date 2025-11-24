import type { PlayerSave } from '../../../domain/player/player-save.entity';

export interface PlayerSavePort {
  findByPlayerId(playerId: string): Promise<PlayerSave | null>;
  create(save: PlayerSave): Promise<PlayerSave>;
  update(id: string, save: Partial<PlayerSave>): Promise<PlayerSave>;
  delete(id: string): Promise<void>;
}

export const PLAYER_SAVE_PORT = Symbol('PLAYER_SAVE_PORT');

