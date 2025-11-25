import type { Book } from '../../../domain/book/book.entity';

export interface BookRepository {
  create(book: Book): Promise<Book>;
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  findByFranchiseId(franchiseId: string): Promise<Book[]>;
  update(id: string, book: Partial<Book>): Promise<Book>;
  delete(id: string): Promise<boolean>;
}

export const BOOK_REPOSITORY = 'BOOK_REPOSITORY';
