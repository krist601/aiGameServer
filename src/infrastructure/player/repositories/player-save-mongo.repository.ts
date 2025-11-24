import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../../application/player/ports/player-save.port';
import {
  PlayerSaveDocument,
  PlayerSaveHydratedDocument,
} from '../schemas/player-save.schema';

@Injectable()
export class PlayerSaveMongoRepository implements PlayerSavePort {
  constructor(
    @InjectModel(PlayerSaveDocument.name)
    private readonly saveModel: Model<PlayerSaveHydratedDocument>,
  ) {}

  async findByPlayerId(playerId: string): Promise<PlayerSave | null> {
    return this.saveModel
      .findOne({ player_id: playerId })
      .lean<PlayerSave>()
      .exec();
  }

  async create(save: PlayerSave): Promise<PlayerSave> {
    const created = new this.saveModel(save);
    return created.save();
  }

  async update(id: string, save: Partial<PlayerSave>): Promise<PlayerSave> {
    const updated = await this.saveModel
      .findByIdAndUpdate(id, save, { new: true })
      .lean<PlayerSave>()
      .exec();
    if (!updated) {
      throw new Error(`Player save ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.saveModel.findByIdAndDelete(id).exec();
  }
}

