import { Inject, Injectable } from '@nestjs/common';
import type { StoryStage } from '../../../domain/story/story-stage.entity';
import {
  STORY_STAGE_PORT,
  type StoryStagePort,
} from '../ports/story-stage.port';

@Injectable()
export class UpdateStoryStageUseCase {
  constructor(
    @Inject(STORY_STAGE_PORT)
    private readonly storyStagePort: StoryStagePort,
  ) {}

  async execute(id: string, stage: Partial<StoryStage>): Promise<StoryStage> {
    return this.storyStagePort.update(id, stage);
  }
}

