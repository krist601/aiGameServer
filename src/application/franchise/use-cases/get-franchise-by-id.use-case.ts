import { Inject, Injectable } from '@nestjs/common';
import type { Franchise } from '../../../domain/franchise/franchise.entity';
import type { FranchiseRepository } from '../ports/franchise.repository';
import { FRANCHISE_REPOSITORY } from '../ports/franchise.repository';

@Injectable()
export class GetFranchiseByIdUseCase {
  constructor(
    @Inject(FRANCHISE_REPOSITORY)
    private readonly franchiseRepository: FranchiseRepository,
  ) {}

  async execute(id: string): Promise<Franchise | null> {
    return this.franchiseRepository.findById(id);
  }
}
