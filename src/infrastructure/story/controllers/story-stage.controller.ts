import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import type { StoryStage } from '../../../domain/story/story-stage.entity';
import { CreateStoryStageUseCase } from '../../../application/story/use-cases/create-story-stage.use-case';
import { UpdateStoryStageUseCase } from '../../../application/story/use-cases/update-story-stage.use-case';
import { GetStoryStageByIdUseCase } from '../../../application/story/use-cases/get-story-stage-by-id.use-case';
import { GetStoryStagesByChapterUseCase } from '../../../application/story/use-cases/get-story-stages-by-chapter.use-case';

@Controller('story-stage')
export class StoryStageController {
  constructor(
    private readonly createStoryStageUseCase: CreateStoryStageUseCase,
    private readonly updateStoryStageUseCase: UpdateStoryStageUseCase,
    private readonly getStoryStageByIdUseCase: GetStoryStageByIdUseCase,
    private readonly getStoryStagesByChapterUseCase: GetStoryStagesByChapterUseCase,
  ) {}

  @Post()
  async create(@Body() stage: StoryStage): Promise<StoryStage> {
    return this.createStoryStageUseCase.execute(stage);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<StoryStage | null> {
    return this.getStoryStageByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() stage: Partial<StoryStage>,
  ): Promise<StoryStage> {
    return this.updateStoryStageUseCase.execute(id, stage);
  }

  @Get('chapter/:chapter')
  async findByChapter(@Param('chapter') chapter: string): Promise<StoryStage[]> {
    return this.getStoryStagesByChapterUseCase.execute(chapter);
  }
}

