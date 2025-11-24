import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GrantPowerUpUseCase } from '../../application/power-up/use-cases/grant-power-up.use-case';
import { ConsumePowerUpUseCase } from '../../application/power-up/use-cases/consume-power-up.use-case';
import { POWER_UP_PORT } from '../../application/power-up/ports/power-up.port';
import { PowerUpMongoRepository } from './repositories/power-up-mongo.repository';
import { PowerUpDocument, PowerUpSchema } from './schemas/power-up.schema';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PowerUpDocument.name, schema: PowerUpSchema },
    ]),
    PlayerModule,
  ],
  providers: [
    GrantPowerUpUseCase,
    ConsumePowerUpUseCase,
    PowerUpMongoRepository,
    {
      provide: POWER_UP_PORT,
      useClass: PowerUpMongoRepository,
    },
  ],
  exports: [POWER_UP_PORT],
})
export class PowerUpModule {}

