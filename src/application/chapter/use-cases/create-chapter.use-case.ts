import { Inject, Injectable } from '@nestjs/common';
import type { Chapter } from '../../../domain/chapter/chapter.entity';
import type { ChapterRepository } from '../ports/chapter.repository';
import { CHAPTER_REPOSITORY } from '../ports/chapter.repository';

@Injectable()
export class CreateChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async execute(chapter: Chapter): Promise<Chapter> {
    return this.chapterRepository.create(chapter);
  }
}
