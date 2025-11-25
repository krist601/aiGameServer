import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Book } from '../../../domain/book/book.entity';
import type { BookRepository } from '../../../application/book/ports/book.repository';
import { BookDocument } from '../schemas/book.schema';

@Injectable()
export class MongooseBookRepository implements BookRepository {
  constructor(
    @InjectModel(BookDocument.name)
    private bookModel: Model<BookDocument>,
  ) {}

  async create(book: Book): Promise<Book> {
    const created = new this.bookModel(book);
    const saved = await created.save();
    return this.toEntity(saved);
  }

  async findById(id: string): Promise<Book | null> {
    const doc = await this.bookModel.findOne({ book_id: id }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findAll(): Promise<Book[]> {
    const docs = await this.bookModel.find().exec();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findByFranchiseId(franchiseId: string): Promise<Book[]> {
    const docs = await this.bookModel
      .find({ franchise_id: franchiseId })
      .sort({ volume_number: 1 })
      .exec();
    return docs.map((doc) => this.toEntity(doc));
  }

  async update(id: string, book: Partial<Book>): Promise<Book> {
    const updated = await this.bookModel
      .findOneAndUpdate({ book_id: id }, book, { new: true })
      .exec();
    if (!updated) {
      throw new Error('Book not found');
    }
    return this.toEntity(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.bookModel.deleteOne({ book_id: id }).exec();
    return result.deletedCount > 0;
  }

  private toEntity(doc: BookDocument): Book {
    return {
      book_id: doc.book_id,
      franchise_id: doc.franchise_id,
      title: doc.title,
      description: doc.description,
      volume_number: doc.volume_number,
      cover_image: doc.cover_image,
      is_published: doc.is_published,
      estimated_duration: doc.estimated_duration,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    };
  }
}
