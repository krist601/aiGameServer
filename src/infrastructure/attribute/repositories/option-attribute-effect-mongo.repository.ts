import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { OptionAttributeEffect } from '../../../domain/attribute/option-attribute-effect.entity';
import {
  OPTION_ATTRIBUTE_EFFECT_PORT,
  type OptionAttributeEffectPort,
} from '../../../application/attribute/ports/option-attribute-effect.port';
import {
  OptionAttributeEffectDocument,
  OptionAttributeEffectHydratedDocument,
} from '../schemas/option-attribute-effect.schema';

@Injectable()
export class OptionAttributeEffectMongoRepository
  implements OptionAttributeEffectPort
{
  constructor(
    @InjectModel(OptionAttributeEffectDocument.name)
    private readonly effectModel: Model<OptionAttributeEffectHydratedDocument>,
  ) {}

  async create(effect: OptionAttributeEffect): Promise<OptionAttributeEffect> {
    const created = new this.effectModel(effect);
    return created.save();
  }

  async findByOptionId(optionId: string): Promise<OptionAttributeEffect[]> {
    return this.effectModel
      .find({ decision_option_id: optionId })
      .lean<OptionAttributeEffect[]>()
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.effectModel.findByIdAndDelete(id).exec();
  }
}

