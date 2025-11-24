import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecisionController } from './controllers/decision.controller';
import { DecisionOptionController } from './controllers/decision-option.controller';
import { CreateDecisionUseCase } from '../../application/decision/use-cases/create-decision.use-case';
import { CreateDecisionOptionUseCase } from '../../application/decision/use-cases/create-decision-option.use-case';
import { ResolveDecisionOptionUseCase } from '../../application/decision/use-cases/resolve-decision-option.use-case';
import { DECISION_PORT } from '../../application/decision/ports/decision.port';
import { DECISION_OPTION_PORT } from '../../application/decision/ports/decision-option.port';
import { DecisionMongoRepository } from './repositories/decision-mongo.repository';
import { DecisionOptionMongoRepository } from './repositories/decision-option-mongo.repository';
import { DecisionDocument, DecisionSchema } from './schemas/decision.schema';
import { DecisionOptionDocument, DecisionOptionSchema } from './schemas/decision-option.schema';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DecisionDocument.name, schema: DecisionSchema },
      { name: DecisionOptionDocument.name, schema: DecisionOptionSchema },
    ]),
    PlayerModule,
  ],
  controllers: [DecisionController, DecisionOptionController],
  providers: [
    CreateDecisionUseCase,
    CreateDecisionOptionUseCase,
    ResolveDecisionOptionUseCase,
    DecisionMongoRepository,
    DecisionOptionMongoRepository,
    {
      provide: DECISION_PORT,
      useClass: DecisionMongoRepository,
    },
    {
      provide: DECISION_OPTION_PORT,
      useClass: DecisionOptionMongoRepository,
    },
  ],
  exports: [DECISION_PORT, DECISION_OPTION_PORT],
})
export class DecisionModule {}

