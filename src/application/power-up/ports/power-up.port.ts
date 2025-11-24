import type { PowerUp } from '../../../domain/power-up/power-up.entity';

export interface PowerUpPort {
  create(powerUp: PowerUp): Promise<PowerUp>;
  findById(id: string): Promise<PowerUp | null>;
  findAll(): Promise<PowerUp[]>;
}

export const POWER_UP_PORT = Symbol('POWER_UP_PORT');

