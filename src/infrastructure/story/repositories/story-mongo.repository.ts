import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoryBranchPort } from '../../../application/story/ports/story-branch.port';
import type { Branch } from '../../../domain/story/branch.entity';
import {
  StoryBranchDocument,
  StoryBranchHydratedDocument,
} from '../schemas/story-branch.schema';
import { STORY_BRANCH } from '../data/story-branch.data';

@Injectable()
export class StoryMongoRepository implements StoryBranchPort {
  private readonly logger = new Logger(StoryMongoRepository.name);

  constructor(
    @InjectModel(StoryBranchDocument.name)
    private readonly branchModel: Model<StoryBranchHydratedDocument>,
  ) {}

  async getRootBranch(): Promise<Branch> {
    const branch = await this.branchModel.findOne().lean<Branch>().exec();

    if (!branch) {
      this.logger.warn(
        'No story branch found in MongoDB. Returning in-memory fallback.',
      );
      return STORY_BRANCH;
    }

    return branch;
  }
}

