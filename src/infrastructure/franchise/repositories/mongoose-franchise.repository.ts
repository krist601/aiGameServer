import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Franchise } from '../../../domain/franchise/franchise.entity';
import type { FranchiseRepository } from '../../../application/franchise/ports/franchise.repository';
import { FranchiseDocument } from '../schemas/franchise.schema';

@Injectable()
export class MongooseFranchiseRepository implements FranchiseRepository {
  constructor(
    @InjectModel(FranchiseDocument.name)
    private franchiseModel: Model<FranchiseDocument>,
  ) {}

  async create(franchise: Franchise): Promise<Franchise> {
    const created = new this.franchiseModel(franchise);
    const saved = await created.save();
    return this.toEntity(saved);
  }

  async findById(id: string): Promise<Franchise | null> {
    const doc = await this.franchiseModel.findOne({ franchise_id: id }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findAll(): Promise<Franchise[]> {
    const docs = await this.franchiseModel.find().exec();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findByName(name: string): Promise<Franchise | null> {
    const doc = await this.franchiseModel.findOne({ name }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async update(id: string, franchise: Partial<Franchise>): Promise<Franchise> {
    const updated = await this.franchiseModel
      .findOneAndUpdate({ franchise_id: id }, franchise, { new: true })
      .exec();
    if (!updated) {
      throw new Error('Franchise not found');
    }
    return this.toEntity(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.franchiseModel
      .deleteOne({ franchise_id: id })
      .exec();
    return result.deletedCount > 0;
  }

  private toEntity(doc: FranchiseDocument): Franchise {
    return {
      franchise_id: doc.franchise_id,
      name: doc.name,
      description: doc.description,
      author: doc.author,
      genre: doc.genre,
      cover_image: doc.cover_image,
      is_active: doc.is_active,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    };
  }
}
