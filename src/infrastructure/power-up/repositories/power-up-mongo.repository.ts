import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { PowerUp } from '../../../domain/power-up/power-up.entity';
import {
  POWER_UP_PORT,
  type PowerUpPort,
} from '../../../application/power-up/ports/power-up.port';
import {
  PowerUpDocument,
  PowerUpHydratedDocument,
} from '../schemas/power-up.schema';

@Injectable()
export class PowerUpMongoRepository implements PowerUpPort {
  constructor(
    @InjectModel(PowerUpDocument.name)
    private readonly powerUpModel: Model<PowerUpHydratedDocument>,
  ) {}

  async create(powerUp: PowerUp): Promise<PowerUp> {
    const created = new this.powerUpModel(powerUp);
    return created.save();
  }

  async findById(id: string): Promise<PowerUp | null> {
    return this.powerUpModel.findById(id).lean<PowerUp>().exec();
  }

  async findAll(): Promise<PowerUp[]> {
    return this.powerUpModel.find().lean<PowerUp[]>().exec();
  }
}

