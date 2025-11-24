import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ACHIEVEMENT_PORT } from '../../application/achievement/ports/achievement.port';
import { AchievementMongoRepository } from './repositories/achievement-mongo.repository';
import {
  AchievementDocument,
  AchievementSchema,
} from './schemas/achievement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AchievementDocument.name,
        schema: AchievementSchema,
      },
    ]),
  ],
  providers: [
    AchievementMongoRepository,
    {
      provide: ACHIEVEMENT_PORT,
      useClass: AchievementMongoRepository,
    },
  ],
  exports: [ACHIEVEMENT_PORT],
})
export class AchievementModule {}

