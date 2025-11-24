import { Inject, Injectable } from '@nestjs/common';
import type { Branch } from '../../../domain/story/branch.entity';
import {
  STORY_BRANCH_PORT,
  type StoryBranchPort,
} from '../ports/story-branch.port';

@Injectable()
export class GetStoryBranchUseCase {
  constructor(
    @Inject(STORY_BRANCH_PORT)
    private readonly storyBranchPort: StoryBranchPort,
  ) {}

  execute(): Promise<Branch> {
    return this.storyBranchPort.getRootBranch();
  }
}

