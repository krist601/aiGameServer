import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoryController } from './controllers/story.controller';
import { GetStoryBranchUseCase } from '../../application/story/use-cases/get-story-branch.use-case';
import { STORY_BRANCH_PORT } from '../../application/story/ports/story-branch.port';
import { StoryInMemoryRepository } from './repositories/story-inmemory.repository';
import {
  StoryBranchDocument,
  StoryBranchSchema,
} from './schemas/story-branch.schema';
import { StoryMongoRepository } from './repositories/story-mongo.repository';

const mongoUri = process.env.MONGO_URI;

@Module({
  imports: [
    ...(mongoUri
      ? [
          MongooseModule.forFeature([
            { name: StoryBranchDocument.name, schema: StoryBranchSchema },
          ]),
        ]
      : []),
  ],
  controllers: [StoryController],
  providers: [
    GetStoryBranchUseCase,
    ...(mongoUri ? [StoryMongoRepository] : []),
    StoryInMemoryRepository,
    {
      provide: STORY_BRANCH_PORT,
      useClass: mongoUri ? StoryMongoRepository : StoryInMemoryRepository,
    },
  ],
})
export class StoryModule {}

