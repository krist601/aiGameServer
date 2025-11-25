import { Inject, Injectable } from '@nestjs/common';
import type { Franchise } from '../../../domain/franchise/franchise.entity';
import type { Book } from '../../../domain/book/book.entity';
import type { Chapter } from '../../../domain/chapter/chapter.entity';
import type { FranchiseRepository } from '../../franchise/ports/franchise.repository';
import type { BookRepository } from '../../book/ports/book.repository';
import type { ChapterRepository } from '../../chapter/ports/chapter.repository';
import { FRANCHISE_REPOSITORY } from '../../franchise/ports/franchise.repository';
import { BOOK_REPOSITORY } from '../../book/ports/book.repository';
import { CHAPTER_REPOSITORY } from '../../chapter/ports/chapter.repository';

export interface FranchiseWithContent {
  franchise: Franchise;
  books: Array<{
    book: Book;
    chapters: Chapter[];
  }>;
}

@Injectable()
export class GetFranchiseWithContentUseCase {
  constructor(
    @Inject(FRANCHISE_REPOSITORY)
    private readonly franchiseRepository: FranchiseRepository,
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async execute(franchiseId: string): Promise<FranchiseWithContent | null> {
    const franchise = await this.franchiseRepository.findById(franchiseId);
    if (!franchise) {
      return null;
    }

    const books = await this.bookRepository.findByFranchiseId(franchiseId);
    
    const booksWithChapters = await Promise.all(
      books.map(async (book) => {
        const chapters = await this.chapterRepository.findByBookId(book.book_id);
        return {
          book,
          chapters,
        };
      }),
    );

    return {
      franchise,
      books: booksWithChapters,
    };
  }
}
