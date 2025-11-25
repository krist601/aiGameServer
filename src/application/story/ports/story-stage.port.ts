import type { StoryStage } from '../../../domain/story/story-stage.entity';

export interface StoryStagePort {
  create(stage: StoryStage): Promise<StoryStage>;
  update(id: string, stage: Partial<StoryStage>): Promise<StoryStage>;
  findById(id: string): Promise<StoryStage | null>;
  findByChapter(chapter: string): Promise<StoryStage[]>;
  findByChapterId(chapterId: string): Promise<StoryStage[]>;
  findAll(): Promise<StoryStage[]>;
}

export const STORY_STAGE_PORT = Symbol('STORY_STAGE_PORT');

