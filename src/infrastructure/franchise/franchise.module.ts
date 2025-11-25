import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FranchiseDocument, FranchiseSchema } from './schemas/franchise.schema';
import { MongooseFranchiseRepository } from './repositories/mongoose-franchise.repository';
import { CreateFranchiseUseCase } from '../../application/franchise/use-cases/create-franchise.use-case';
import { GetAllFranchisesUseCase } from '../../application/franchise/use-cases/get-all-franchises.use-case';
import { GetFranchiseByIdUseCase } from '../../application/franchise/use-cases/get-franchise-by-id.use-case';
import { GetFranchiseWithContentUseCase } from '../../application/franchise/use-cases/get-franchise-with-content.use-case';
import { FranchiseController } from './controllers/franchise.controller';
import { FRANCHISE_REPOSITORY } from '../../application/franchise/ports/franchise.repository';
import { BookModule } from '../book/book.module';
import { ChapterModule } from '../chapter/chapter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FranchiseDocument.name, schema: FranchiseSchema },
    ]),
    BookModule,
    ChapterModule,
  ],
  controllers: [FranchiseController],
  providers: [
    {
      provide: FRANCHISE_REPOSITORY,
      useClass: MongooseFranchiseRepository,
    },
    CreateFranchiseUseCase,
    GetAllFranchisesUseCase,
    GetFranchiseByIdUseCase,
    GetFranchiseWithContentUseCase,
  ],
  exports: [FRANCHISE_REPOSITORY],
})
export class FranchiseModule {}
