import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSaveController } from './controllers/player-save.controller';
import { LoadPlayerSaveUseCase } from '../../application/player/use-cases/load-player-save.use-case';
import { UpdatePlayerSaveUseCase } from '../../application/player/use-cases/update-player-save.use-case';
import { ResetPlayerSaveUseCase } from '../../application/player/use-cases/reset-player-save.use-case';
import { PLAYER_SAVE_PORT } from '../../application/player/ports/player-save.port';
import { PlayerSaveMongoRepository } from './repositories/player-save-mongo.repository';
import {
  PlayerSaveDocument,
  PlayerSaveSchema,
} from './schemas/player-save.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerSaveDocument.name, schema: PlayerSaveSchema },
    ]),
  ],
  controllers: [PlayerSaveController],
  providers: [
    LoadPlayerSaveUseCase,
    UpdatePlayerSaveUseCase,
    ResetPlayerSaveUseCase,
    PlayerSaveMongoRepository,
    {
      provide: PLAYER_SAVE_PORT,
      useClass: PlayerSaveMongoRepository,
    },
  ],
  exports: [PLAYER_SAVE_PORT],
})
export class PlayerModule {}

