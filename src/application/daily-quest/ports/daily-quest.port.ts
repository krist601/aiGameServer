import type { DailyQuest } from '../../../domain/daily-quest/daily-quest.entity';

export interface DailyQuestPort {
  create(quest: DailyQuest): Promise<DailyQuest>;
  findById(id: string): Promise<DailyQuest | null>;
  findActive(): Promise<DailyQuest[]>;
  update(id: string, quest: Partial<DailyQuest>): Promise<DailyQuest>;
  deleteExpired(): Promise<void>;
}

export const DAILY_QUEST_PORT = Symbol('DAILY_QUEST_PORT');

