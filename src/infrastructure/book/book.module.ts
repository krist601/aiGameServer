import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookDocument, BookSchema } from './schemas/book.schema';
import { MongooseBookRepository } from './repositories/mongoose-book.repository';
import { CreateBookUseCase } from '../../application/book/use-cases/create-book.use-case';
import { GetBooksByFranchiseUseCase } from '../../application/book/use-cases/get-books-by-franchise.use-case';
import { BookController } from './controllers/book.controller';
import { BOOK_REPOSITORY } from '../../application/book/ports/book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookDocument.name, schema: BookSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [
    {
      provide: BOOK_REPOSITORY,
      useClass: MongooseBookRepository,
    },
    CreateBookUseCase,
    GetBooksByFranchiseUseCase,
  ],
  exports: [BOOK_REPOSITORY],
})
export class BookModule {}
