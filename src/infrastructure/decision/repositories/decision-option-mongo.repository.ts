import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { DecisionOption } from '../../../domain/decision/decision-option.entity';
import {
  DECISION_OPTION_PORT,
  type DecisionOptionPort,
} from '../../../application/decision/ports/decision-option.port';
import {
  DecisionOptionDocument,
  DecisionOptionHydratedDocument,
} from '../schemas/decision-option.schema';

@Injectable()
export class DecisionOptionMongoRepository implements DecisionOptionPort {
  constructor(
    @InjectModel(DecisionOptionDocument.name)
    private readonly optionModel: Model<DecisionOptionHydratedDocument>,
  ) {}

  async create(option: DecisionOption): Promise<DecisionOption> {
    const created = new this.optionModel(option);
    const saved = await created.save();
    return saved.toObject() as DecisionOption;
  }

  async findById(id: string): Promise<DecisionOption | null> {
    return this.optionModel.findById(id).lean<DecisionOption>().exec();
  }

  async findByDecisionId(decisionId: string): Promise<DecisionOption[]> {
    return this.optionModel
      .find({ decision_id: decisionId })
      .lean<DecisionOption[]>()
      .exec();
  }

  async update(
    id: string,
    option: Partial<DecisionOption>,
  ): Promise<DecisionOption> {
    const updated = await this.optionModel
      .findByIdAndUpdate(id, option, { new: true })
      .lean<DecisionOption>()
      .exec();
    if (!updated) {
      throw new Error(`Decision option ${id} not found`);
    }
    return updated;
  }
}

