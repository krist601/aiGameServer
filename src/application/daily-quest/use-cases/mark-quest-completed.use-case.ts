import { Inject, Injectable } from '@nestjs/common';
import type { DailyQuest } from '../../../domain/daily-quest/daily-quest.entity';
import {
  DAILY_QUEST_PORT,
  type DailyQuestPort,
} from '../ports/daily-quest.port';

@Injectable()
export class MarkQuestCompletedUseCase {
  constructor(
    @Inject(DAILY_QUEST_PORT)
    private readonly dailyQuestPort: DailyQuestPort,
  ) {}

  async execute(questId: string): Promise<DailyQuest> {
    return this.dailyQuestPort.update(questId, { is_completed: true });
  }
}

