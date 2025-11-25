import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { Franchise } from '../../../domain/franchise/franchise.entity';
import { CreateFranchiseUseCase } from '../../../application/franchise/use-cases/create-franchise.use-case';
import { GetAllFranchisesUseCase } from '../../../application/franchise/use-cases/get-all-franchises.use-case';
import { GetFranchiseByIdUseCase } from '../../../application/franchise/use-cases/get-franchise-by-id.use-case';
import { GetFranchiseWithContentUseCase, type FranchiseWithContent } from '../../../application/franchise/use-cases/get-franchise-with-content.use-case';

@Controller('franchise')
export class FranchiseController {
  constructor(
    private readonly createFranchiseUseCase: CreateFranchiseUseCase,
    private readonly getAllFranchisesUseCase: GetAllFranchisesUseCase,
    private readonly getFranchiseByIdUseCase: GetFranchiseByIdUseCase,
    private readonly getFranchiseWithContentUseCase: GetFranchiseWithContentUseCase,
  ) {}

  @Post()
  async create(@Body() franchise: Franchise): Promise<Franchise> {
    return this.createFranchiseUseCase.execute(franchise);
  }

  @Get()
  async findAll(): Promise<Franchise[]> {
    return this.getAllFranchisesUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Franchise | null> {
    return this.getFranchiseByIdUseCase.execute(id);
  }

  @Get(':id/content')
  async getWithContent(@Param('id') id: string): Promise<FranchiseWithContent | null> {
    return this.getFranchiseWithContentUseCase.execute(id);
  }
}
