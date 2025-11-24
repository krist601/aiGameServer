import { Module } from '@nestjs/common';
import { StoryController } from './controllers/story.controller';
import { GetStoryBranchUseCase } from '../../application/story/use-cases/get-story-branch.use-case';
import {
  STORY_BRANCH_PORT,
  StoryBranchPort,
} from '../../application/story/ports/story-branch.port';
import { StoryInMemoryRepository } from './repositories/story-inmemory.repository';

@Module({
  controllers: [StoryController],
  providers: [
    GetStoryBranchUseCase,
    {
      provide: STORY_BRANCH_PORT,
      useClass: StoryInMemoryRepository,
    },
    StoryInMemoryRepository,
  ],
})
export class StoryModule {}

