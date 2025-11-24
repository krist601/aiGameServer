import { Inject, Injectable } from '@nestjs/common';
import type { StoryStage } from '../../../domain/story/story-stage.entity';
import {
  STORY_STAGE_PORT,
  type StoryStagePort,
} from '../ports/story-stage.port';

@Injectable()
export class GetStoryStageByIdUseCase {
  constructor(
    @Inject(STORY_STAGE_PORT)
    private readonly storyStagePort: StoryStagePort,
  ) {}

  async execute(id: string): Promise<StoryStage | null> {
    return this.storyStagePort.findById(id);
  }
}

