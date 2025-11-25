import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChapterDocument, ChapterSchema } from './schemas/chapter.schema';
import { MongooseChapterRepository } from './repositories/mongoose-chapter.repository';
import { CreateChapterUseCase } from '../../application/chapter/use-cases/create-chapter.use-case';
import { GetChaptersByBookUseCase } from '../../application/chapter/use-cases/get-chapters-by-book.use-case';
import { ChapterController } from './controllers/chapter.controller';
import { CHAPTER_REPOSITORY } from '../../application/chapter/ports/chapter.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChapterDocument.name, schema: ChapterSchema },
    ]),
  ],
  controllers: [ChapterController],
  providers: [
    {
      provide: CHAPTER_REPOSITORY,
      useClass: MongooseChapterRepository,
    },
    CreateChapterUseCase,
    GetChaptersByBookUseCase,
  ],
  exports: [CHAPTER_REPOSITORY],
})
export class ChapterModule {}
