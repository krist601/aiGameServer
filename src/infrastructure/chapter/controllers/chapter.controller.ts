import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { Chapter } from '../../../domain/chapter/chapter.entity';
import { CreateChapterUseCase } from '../../../application/chapter/use-cases/create-chapter.use-case';
import { GetChaptersByBookUseCase } from '../../../application/chapter/use-cases/get-chapters-by-book.use-case';

@Controller('chapter')
export class ChapterController {
  constructor(
    private readonly createChapterUseCase: CreateChapterUseCase,
    private readonly getChaptersByBookUseCase: GetChaptersByBookUseCase,
  ) {}

  @Post()
  async create(@Body() chapter: Chapter): Promise<Chapter> {
    return this.createChapterUseCase.execute(chapter);
  }

  @Get('book/:bookId')
  async findByBook(@Param('bookId') bookId: string): Promise<Chapter[]> {
    return this.getChaptersByBookUseCase.execute(bookId);
  }
}
