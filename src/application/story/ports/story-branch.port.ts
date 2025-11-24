import type { Branch } from '../../../domain/story/branch.entity';

export interface StoryBranchPort {
  getRootBranch(): Promise<Branch>;
}

export const STORY_BRANCH_PORT = Symbol('STORY_BRANCH_PORT');

