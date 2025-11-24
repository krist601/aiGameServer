import { CreateStoryStageUseCase } from './create-story-stage.use-case';
import type { StoryStage } from '../../../domain/story/story-stage.entity';
import type { StoryStagePort } from '../ports/story-stage.port';

describe('CreateStoryStageUseCase', () => {
  it('should create a story stage', async () => {
    const mockStage: StoryStage = {
      name: 'Test Stage',
      scene: 'scene1',
      title: 'Test Title',
      sub_title: 'Test Subtitle',
      image: 'test.jpg',
      text: 'Test text',
      question: 'Test question?',
      is_canonical_progress: false,
    };

    const mockPort: StoryStagePort = {
      create: jest.fn().mockResolvedValue(mockStage),
      update: jest.fn(),
      findById: jest.fn(),
      findByChapter: jest.fn(),
      findAll: jest.fn(),
    };

    const useCase = new CreateStoryStageUseCase(mockPort);
    const result = await useCase.execute(mockStage);

    expect(result).toEqual(mockStage);
    expect(mockPort.create).toHaveBeenCalledWith(mockStage);
    expect(mockPort.create).toHaveBeenCalledTimes(1);
  });
});

