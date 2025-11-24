import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyQuestController } from './controllers/daily-quest.controller';
import { RefreshDailyQuestsUseCase } from '../../application/daily-quest/use-cases/refresh-daily-quests.use-case';
import { MarkQuestCompletedUseCase } from '../../application/daily-quest/use-cases/mark-quest-completed.use-case';
import { ClaimQuestRewardUseCase } from '../../application/daily-quest/use-cases/claim-quest-reward.use-case';
import { DAILY_QUEST_PORT } from '../../application/daily-quest/ports/daily-quest.port';
import { DailyQuestMongoRepository } from './repositories/daily-quest-mongo.repository';
import {
  DailyQuestDocument,
  DailyQuestSchema,
} from './schemas/daily-quest.schema';
import { InventoryModule } from '../inventory/inventory.module';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyQuestDocument.name, schema: DailyQuestSchema },
    ]),
    InventoryModule,
    PlayerModule,
  ],
  controllers: [DailyQuestController],
  providers: [
    RefreshDailyQuestsUseCase,
    MarkQuestCompletedUseCase,
    ClaimQuestRewardUseCase,
    DailyQuestMongoRepository,
    {
      provide: DAILY_QUEST_PORT,
      useClass: DailyQuestMongoRepository,
    },
  ],
  exports: [DAILY_QUEST_PORT],
})
export class DailyQuestModule {}

