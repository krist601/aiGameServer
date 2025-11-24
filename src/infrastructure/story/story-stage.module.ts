import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoryStageController } from './controllers/story-stage.controller';
import { CreateStoryStageUseCase } from '../../application/story/use-cases/create-story-stage.use-case';
import { UpdateStoryStageUseCase } from '../../application/story/use-cases/update-story-stage.use-case';
import { GetStoryStageByIdUseCase } from '../../application/story/use-cases/get-story-stage-by-id.use-case';
import { GetStoryStagesByChapterUseCase } from '../../application/story/use-cases/get-story-stages-by-chapter.use-case';
import {
  STORY_STAGE_PORT,
  type StoryStagePort,
} from '../../application/story/ports/story-stage.port';
import { StoryStageMongoRepository } from './repositories/story-stage-mongo.repository';
import {
  StoryStageDocument,
  StoryStageSchema,
} from './schemas/story-stage.schema';

const mongoUri = process.env.MONGO_URI;

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StoryStageDocument.name, schema: StoryStageSchema },
    ]),
  ],
  controllers: [StoryStageController],
  providers: [
    CreateStoryStageUseCase,
    UpdateStoryStageUseCase,
    GetStoryStageByIdUseCase,
    GetStoryStagesByChapterUseCase,
    StoryStageMongoRepository,
    {
      provide: STORY_STAGE_PORT,
      useClass: StoryStageMongoRepository,
    },
  ],
  exports: [STORY_STAGE_PORT],
})
export class StoryStageModule {}

