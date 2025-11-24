import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Attribute } from '../../../domain/attribute/attribute.entity';
import {
  ATTRIBUTE_PORT,
  type AttributePort,
} from '../../../application/attribute/ports/attribute.port';
import {
  AttributeDocument,
  AttributeHydratedDocument,
} from '../schemas/attribute.schema';

@Injectable()
export class AttributeMongoRepository implements AttributePort {
  constructor(
    @InjectModel(AttributeDocument.name)
    private readonly attributeModel: Model<AttributeHydratedDocument>,
  ) {}

  async create(attribute: Attribute): Promise<Attribute> {
    const created = new this.attributeModel(attribute);
    return created.save();
  }

  async findById(id: string): Promise<Attribute | null> {
    return this.attributeModel.findById(id).lean<Attribute>().exec();
  }

  async findByName(name: string): Promise<Attribute | null> {
    return this.attributeModel.findOne({ name }).lean<Attribute>().exec();
  }

  async findAll(): Promise<Attribute[]> {
    return this.attributeModel.find().lean<Attribute[]>().exec();
  }
}

