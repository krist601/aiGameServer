import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { DailyQuest } from '../../../domain/daily-quest/daily-quest.entity';
import { RefreshDailyQuestsUseCase } from '../../../application/daily-quest/use-cases/refresh-daily-quests.use-case';
import { MarkQuestCompletedUseCase } from '../../../application/daily-quest/use-cases/mark-quest-completed.use-case';
import { ClaimQuestRewardUseCase } from '../../../application/daily-quest/use-cases/claim-quest-reward.use-case';

@Controller('daily-quest')
export class DailyQuestController {
  constructor(
    private readonly refreshDailyQuestsUseCase: RefreshDailyQuestsUseCase,
    private readonly markQuestCompletedUseCase: MarkQuestCompletedUseCase,
    private readonly claimQuestRewardUseCase: ClaimQuestRewardUseCase,
  ) {}

  @Get('refresh')
  async refresh(): Promise<DailyQuest[]> {
    return this.refreshDailyQuestsUseCase.execute();
  }

  @Post(':id/complete')
  async complete(@Param('id') questId: string): Promise<DailyQuest> {
    return this.markQuestCompletedUseCase.execute(questId);
  }

  @Post(':id/claim')
  async claim(
    @Param('id') questId: string,
    @Body() body: { player_id: string },
  ): Promise<{ quest: DailyQuest; rewardGranted: boolean }> {
    return this.claimQuestRewardUseCase.execute(questId, body.player_id);
  }
}

