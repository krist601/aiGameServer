import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { PowerUp } from '../../../domain/power-up/power-up.entity';

@Schema({ collection: 'power_ups', timestamps: true })
export class PowerUpDocument implements PowerUp {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  value!: number;

  @Prop({ required: true, enum: ['temporary', 'permanent'], default: 'temporary' })
  type!: 'temporary' | 'permanent';

  @Prop()
  duration_seconds?: number;
}

export type PowerUpHydratedDocument = HydratedDocument<PowerUpDocument>;
export const PowerUpSchema = SchemaFactory.createForClass(PowerUpDocument);

