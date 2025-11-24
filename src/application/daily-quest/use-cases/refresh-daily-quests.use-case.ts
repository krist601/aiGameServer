import { Inject, Injectable } from '@nestjs/common';
import type { DailyQuest } from '../../../domain/daily-quest/daily-quest.entity';
import {
  DAILY_QUEST_PORT,
  type DailyQuestPort,
} from '../ports/daily-quest.port';

@Injectable()
export class RefreshDailyQuestsUseCase {
  constructor(
    @Inject(DAILY_QUEST_PORT)
    private readonly dailyQuestPort: DailyQuestPort,
  ) {}

  async execute(): Promise<DailyQuest[]> {
    // Delete expired quests
    await this.dailyQuestPort.deleteExpired();

    // Return active quests
    return this.dailyQuestPort.findActive();
  }
}

