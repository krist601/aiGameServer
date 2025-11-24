import { StoryBranchPort } from '../ports/story-branch.port';
import { GetStoryBranchUseCase } from './get-story-branch.use-case';
import { Branch } from '../../../domain/story/branch.entity';

describe('GetStoryBranchUseCase', () => {
  it('returns the branch provided by the port', () => {
    const branch: Branch = {
      title: 'Title',
      sub_title: 'Subtitle',
      image: 'image.png',
      option: 'Start',
      text: 'Intro text',
      question: 'What now?',
      options: [],
    };

    const mockPort: StoryBranchPort = {
      getRootBranch: jest.fn().mockReturnValue(branch),
    };

    const useCase = new GetStoryBranchUseCase(mockPort);

    expect(useCase.execute()).toBe(branch);
    expect(mockPort.getRootBranch).toHaveBeenCalledTimes(1);
  });
});

