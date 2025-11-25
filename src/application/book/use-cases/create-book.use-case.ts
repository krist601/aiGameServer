import { Inject, Injectable } from '@nestjs/common';
import type { Book } from '../../../domain/book/book.entity';
import type { BookRepository } from '../ports/book.repository';
import { BOOK_REPOSITORY } from '../ports/book.repository';

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(book: Book): Promise<Book> {
    return this.bookRepository.create(book);
  }
}
