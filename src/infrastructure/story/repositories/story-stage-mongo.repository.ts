import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { StoryStage } from '../../../domain/story/story-stage.entity';
import {
  STORY_STAGE_PORT,
  type StoryStagePort,
} from '../../../application/story/ports/story-stage.port';
import {
  StoryStageDocument,
  StoryStageHydratedDocument,
} from '../schemas/story-stage.schema';

@Injectable()
export class StoryStageMongoRepository implements StoryStagePort {
  constructor(
    @InjectModel(StoryStageDocument.name)
    private readonly stageModel: Model<StoryStageHydratedDocument>,
  ) {}

  async create(stage: StoryStage): Promise<StoryStage> {
    const created = new this.stageModel(stage);
    return created.save();
  }

  async update(id: string, stage: Partial<StoryStage>): Promise<StoryStage> {
    const updated = await this.stageModel
      .findByIdAndUpdate(id, stage, { new: true })
      .lean<StoryStage>()
      .exec();
    if (!updated) {
      throw new Error(`Story stage ${id} not found`);
    }
    return updated;
  }

  async findById(id: string): Promise<StoryStage | null> {
    return this.stageModel.findById(id).lean<StoryStage>().exec();
  }

  async findByChapter(chapter: string): Promise<StoryStage[]> {
    return this.stageModel.find({ chapter }).lean<StoryStage[]>().exec();
  }

  async findByChapterId(chapterId: string): Promise<StoryStage[]> {
    return this.stageModel
      .find({ chapter_id: chapterId })
      .sort({ stage_order: 1 })
      .lean<StoryStage[]>()
      .exec();
  }

  async findAll(): Promise<StoryStage[]> {
    return this.stageModel.find().lean<StoryStage[]>().exec();
  }
}

