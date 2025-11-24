import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CanonicalEventController } from './controllers/canonical-event.controller';
import { CreateCanonicalEventUseCase } from '../../application/canonical-event/use-cases/create-canonical-event.use-case';
import { TriggerCanonicalEventUseCase } from '../../application/canonical-event/use-cases/trigger-canonical-event.use-case';
import { GetCanonicalProgressUseCase } from '../../application/canonical-event/use-cases/get-canonical-progress.use-case';
import { CANONICAL_EVENT_PORT } from '../../application/canonical-event/ports/canonical-event.port';
import { CanonicalEventMongoRepository } from './repositories/canonical-event-mongo.repository';
import {
  CanonicalEventDocument,
  CanonicalEventSchema,
} from './schemas/canonical-event.schema';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CanonicalEventDocument.name,
        schema: CanonicalEventSchema,
      },
    ]),
    PlayerModule,
  ],
  controllers: [CanonicalEventController],
  providers: [
    CreateCanonicalEventUseCase,
    TriggerCanonicalEventUseCase,
    GetCanonicalProgressUseCase,
    CanonicalEventMongoRepository,
    {
      provide: CANONICAL_EVENT_PORT,
      useClass: CanonicalEventMongoRepository,
    },
  ],
  exports: [CANONICAL_EVENT_PORT],
})
export class CanonicalEventModule {}

