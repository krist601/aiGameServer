import type { Achievement } from '../../../domain/achievement/achievement.entity';

export interface AchievementPort {
  create(achievement: Achievement): Promise<Achievement>;
  findById(id: string): Promise<Achievement | null>;
  findAll(): Promise<Achievement[]>;
}

export const ACHIEVEMENT_PORT = Symbol('ACHIEVEMENT_PORT');

