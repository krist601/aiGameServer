import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Chapter } from '../../../domain/chapter/chapter.entity';
import type { ChapterRepository } from '../../../application/chapter/ports/chapter.repository';
import { ChapterDocument } from '../schemas/chapter.schema';

@Injectable()
export class MongooseChapterRepository implements ChapterRepository {
  constructor(
    @InjectModel(ChapterDocument.name)
    private chapterModel: Model<ChapterDocument>,
  ) {}

  async create(chapter: Chapter): Promise<Chapter> {
    const created = new this.chapterModel(chapter);
    const saved = await created.save();
    return this.toEntity(saved);
  }

  async findById(id: string): Promise<Chapter | null> {
    const doc = await this.chapterModel.findOne({ chapter_id: id }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findAll(): Promise<Chapter[]> {
    const docs = await this.chapterModel.find().exec();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findByBookId(bookId: string): Promise<Chapter[]> {
    const docs = await this.chapterModel
      .find({ book_id: bookId })
      .sort({ chapter_number: 1 })
      .exec();
    return docs.map((doc) => this.toEntity(doc));
  }

  async update(id: string, chapter: Partial<Chapter>): Promise<Chapter> {
    const updated = await this.chapterModel
      .findOneAndUpdate({ chapter_id: id }, chapter, { new: true })
      .exec();
    if (!updated) {
      throw new Error('Chapter not found');
    }
    return this.toEntity(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.chapterModel.deleteOne({ chapter_id: id }).exec();
    return result.deletedCount > 0;
  }

  private toEntity(doc: ChapterDocument): Chapter {
    return {
      chapter_id: doc.chapter_id,
      book_id: doc.book_id,
      title: doc.title,
      description: doc.description,
      chapter_number: doc.chapter_number,
      is_unlocked_by_default: doc.is_unlocked_by_default,
      unlock_requirements: doc.unlock_requirements,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    };
  }
}
