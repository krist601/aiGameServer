import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Decision } from '../../../domain/decision/decision.entity';
import {
  DECISION_PORT,
  type DecisionPort,
} from '../../../application/decision/ports/decision.port';
import {
  DecisionDocument,
  DecisionHydratedDocument,
} from '../schemas/decision.schema';

@Injectable()
export class DecisionMongoRepository implements DecisionPort {
  constructor(
    @InjectModel(DecisionDocument.name)
    private readonly decisionModel: Model<DecisionHydratedDocument>,
  ) {}

  async create(decision: Decision): Promise<Decision> {
    const created = new this.decisionModel(decision);
    const saved = await created.save();
    return saved.toObject() as Decision;
  }

  async findById(id: string): Promise<Decision | null> {
    return this.decisionModel.findById(id).lean<Decision>().exec();
  }

  async findByStageId(stageId: string): Promise<Decision[]> {
    return this.decisionModel
      .find({ story_stage_id: stageId })
      .lean<Decision[]>()
      .exec();
  }
}

