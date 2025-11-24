import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { DailyQuest } from '../../../domain/daily-quest/daily-quest.entity';
import {
  DAILY_QUEST_PORT,
  type DailyQuestPort,
} from '../../../application/daily-quest/ports/daily-quest.port';
import {
  DailyQuestDocument,
  DailyQuestHydratedDocument,
} from '../schemas/daily-quest.schema';

@Injectable()
export class DailyQuestMongoRepository implements DailyQuestPort {
  constructor(
    @InjectModel(DailyQuestDocument.name)
    private readonly questModel: Model<DailyQuestHydratedDocument>,
  ) {}

  async create(quest: DailyQuest): Promise<DailyQuest> {
    const created = new this.questModel(quest);
    return created.save();
  }

  async findById(id: string): Promise<DailyQuest | null> {
    return this.questModel.findById(id).lean<DailyQuest>().exec();
  }

  async findActive(): Promise<DailyQuest[]> {
    const now = new Date();
    return this.questModel
      .find({ expires_at: { $gt: now } })
      .lean<DailyQuest[]>()
      .exec();
  }

  async update(
    id: string,
    quest: Partial<DailyQuest>,
  ): Promise<DailyQuest> {
    const updated = await this.questModel
      .findByIdAndUpdate(id, quest, { new: true })
      .lean<DailyQuest>()
      .exec();
    if (!updated) {
      throw new Error(`Daily quest ${id} not found`);
    }
    return updated;
  }

  async deleteExpired(): Promise<void> {
    const now = new Date();
    await this.questModel.deleteMany({ expires_at: { $lt: now } }).exec();
  }
}

