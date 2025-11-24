import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryModule } from './infrastructure/story/story.module';
import { StoryStageModule } from './infrastructure/story/story-stage.module';
import { DecisionModule } from './infrastructure/decision/decision.module';
import { AttributeModule } from './infrastructure/attribute/attribute.module';
import { CanonicalEventModule } from './infrastructure/canonical-event/canonical-event.module';
import { PowerUpModule } from './infrastructure/power-up/power-up.module';
import { AchievementModule } from './infrastructure/achievement/achievement.module';
import { ItemModule } from './infrastructure/item/item.module';
import { InventoryModule } from './infrastructure/inventory/inventory.module';
import { DailyQuestModule } from './infrastructure/daily-quest/daily-quest.module';
import { FriendChallengeModule } from './infrastructure/friend-challenge/friend-challenge.module';
import { PlayerModule } from './infrastructure/player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/ai-game',
        retryWrites: true,
        retryReads: true,
      }),
      inject: [ConfigService],
    }),
    StoryModule,
    StoryStageModule,
    DecisionModule,
    AttributeModule,
    CanonicalEventModule,
    PowerUpModule,
    AchievementModule,
    ItemModule,
    InventoryModule,
    DailyQuestModule,
    FriendChallengeModule,
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
