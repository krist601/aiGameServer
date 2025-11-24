import { Inject, Injectable } from '@nestjs/common';
import { Branch } from '../../../domain/story/branch.entity';
import {
  StoryBranchPort,
  STORY_BRANCH_PORT,
} from '../ports/story-branch.port';

@Injectable()
export class GetStoryBranchUseCase {
  constructor(
    @Inject(STORY_BRANCH_PORT)
    private readonly storyBranchPort: StoryBranchPort,
  ) {}

  execute(): Branch {
    return this.storyBranchPort.getRootBranch();
  }
}

