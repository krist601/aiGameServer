import type { Franchise } from '../../../domain/franchise/franchise.entity';

export interface FranchiseRepository {
  create(franchise: Franchise): Promise<Franchise>;
  findById(id: string): Promise<Franchise | null>;
  findAll(): Promise<Franchise[]>;
  findByName(name: string): Promise<Franchise | null>;
  update(id: string, franchise: Partial<Franchise>): Promise<Franchise>;
  delete(id: string): Promise<boolean>;
}

export const FRANCHISE_REPOSITORY = 'FRANCHISE_REPOSITORY';
