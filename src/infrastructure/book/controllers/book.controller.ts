import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { Book } from '../../../domain/book/book.entity';
import { CreateBookUseCase } from '../../../application/book/use-cases/create-book.use-case';
import { GetBooksByFranchiseUseCase } from '../../../application/book/use-cases/get-books-by-franchise.use-case';

@Controller('book')
export class BookController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBooksByFranchiseUseCase: GetBooksByFranchiseUseCase,
  ) {}

  @Post()
  async create(@Body() book: Book): Promise<Book> {
    return this.createBookUseCase.execute(book);
  }

  @Get('franchise/:franchiseId')
  async findByFranchise(
    @Param('franchiseId') franchiseId: string,
  ): Promise<Book[]> {
    return this.getBooksByFranchiseUseCase.execute(franchiseId);
  }
}
