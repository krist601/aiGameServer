import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';
import {
  CANONICAL_EVENT_PORT,
  type CanonicalEventPort,
} from '../../../application/canonical-event/ports/canonical-event.port';
import {
  CanonicalEventDocument,
  CanonicalEventHydratedDocument,
} from '../schemas/canonical-event.schema';

@Injectable()
export class CanonicalEventMongoRepository implements CanonicalEventPort {
  constructor(
    @InjectModel(CanonicalEventDocument.name)
    private readonly eventModel: Model<CanonicalEventHydratedDocument>,
  ) {}

  async create(event: CanonicalEvent): Promise<CanonicalEvent> {
    const created = new this.eventModel(event);
    return created.save();
  }

  async findById(id: string): Promise<CanonicalEvent | null> {
    return this.eventModel.findById(id).lean<CanonicalEvent>().exec();
  }

  async findAll(): Promise<CanonicalEvent[]> {
    return this.eventModel.find().lean<CanonicalEvent[]>().exec();
  }

  async findByTriggerStage(stageId: string): Promise<CanonicalEvent[]> {
    return this.eventModel
      .find({ trigger_stage_id: stageId })
      .lean<CanonicalEvent[]>()
      .exec();
  }

  async update(
    id: string,
    event: Partial<CanonicalEvent>,
  ): Promise<CanonicalEvent> {
    const updated = await this.eventModel
      .findByIdAndUpdate(id, event, { new: true })
      .lean<CanonicalEvent>()
      .exec();
    if (!updated) {
      throw new Error(`Canonical event ${id} not found`);
    }
    return updated;
  }
}

