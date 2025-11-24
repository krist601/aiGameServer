import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Item } from '../../../domain/item/item.entity';
import { ITEM_PORT, type ItemPort } from '../../../application/item/ports/item.port';
import {
  ItemDocument,
  ItemHydratedDocument,
} from '../schemas/item.schema';

@Injectable()
export class ItemMongoRepository implements ItemPort {
  constructor(
    @InjectModel(ItemDocument.name)
    private readonly itemModel: Model<ItemHydratedDocument>,
  ) {}

  async create(item: Item): Promise<Item> {
    const created = new this.itemModel(item);
    return created.save();
  }

  async findById(id: string): Promise<Item | null> {
    return this.itemModel.findById(id).lean<Item>().exec();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().lean<Item[]>().exec();
  }
}

