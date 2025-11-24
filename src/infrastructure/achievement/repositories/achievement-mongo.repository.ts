import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Achievement } from '../../../domain/achievement/achievement.entity';
import {
  ACHIEVEMENT_PORT,
  type AchievementPort,
} from '../../../application/achievement/ports/achievement.port';
import {
  AchievementDocument,
  AchievementHydratedDocument,
} from '../schemas/achievement.schema';

@Injectable()
export class AchievementMongoRepository implements AchievementPort {
  constructor(
    @InjectModel(AchievementDocument.name)
    private readonly achievementModel: Model<AchievementHydratedDocument>,
  ) {}

  async create(achievement: Achievement): Promise<Achievement> {
    const created = new this.achievementModel(achievement);
    return created.save();
  }

  async findById(id: string): Promise<Achievement | null> {
    return this.achievementModel.findById(id).lean<Achievement>().exec();
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementModel.find().lean<Achievement[]>().exec();
  }
}

