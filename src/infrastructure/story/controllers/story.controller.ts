import { Controller, Get } from '@nestjs/common';
import type { Branch } from '../../../domain/story/branch.entity';
import { GetStoryBranchUseCase } from '../../../application/story/use-cases/get-story-branch.use-case';

@Controller('story')
export class StoryController {
  constructor(private readonly getStoryBranchUseCase: GetStoryBranchUseCase) {}

  @Get()
  getStory(): Promise<Branch> {
    return this.getStoryBranchUseCase.execute();
  }
}

