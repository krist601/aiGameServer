import { Controller, Get } from '@nestjs/common';
import { Branch } from '../../../domain/story/branch.entity';
import { GetStoryBranchUseCase } from '../../../application/story/use-cases/get-story-branch.use-case';

@Controller('story')
export class StoryController {
  constructor(private readonly getStoryBranchUseCase: GetStoryBranchUseCase) {}

  @Get()
  getStory(): Branch {
    return this.getStoryBranchUseCase.execute();
  }
}

