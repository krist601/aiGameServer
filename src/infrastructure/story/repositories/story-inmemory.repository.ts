import { Injectable } from '@nestjs/common';
import { StoryBranchPort } from '../../../application/story/ports/story-branch.port';
import { Branch } from '../../../domain/story/branch.entity';
import { STORY_BRANCH } from '../data/story-branch.data';

@Injectable()
export class StoryInMemoryRepository implements StoryBranchPort {
  getRootBranch(): Branch {
    return STORY_BRANCH;
  }
}

