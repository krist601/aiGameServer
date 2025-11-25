import type { Chapter } from '../../../domain/chapter/chapter.entity';

export interface ChapterRepository {
  create(chapter: Chapter): Promise<Chapter>;
  findById(id: string): Promise<Chapter | null>;
  findAll(): Promise<Chapter[]>;
  findByBookId(bookId: string): Promise<Chapter[]>;
  update(id: string, chapter: Partial<Chapter>): Promise<Chapter>;
  delete(id: string): Promise<boolean>;
}

export const CHAPTER_REPOSITORY = 'CHAPTER_REPOSITORY';
