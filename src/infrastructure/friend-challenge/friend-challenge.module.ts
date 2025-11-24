import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendChallengeController } from './controllers/friend-challenge.controller';
import { CreateChallengeUseCase } from '../../application/friend-challenge/use-cases/create-challenge.use-case';
import { AcceptChallengeUseCase } from '../../application/friend-challenge/use-cases/accept-challenge.use-case';
import { ResolveChallengeUseCase } from '../../application/friend-challenge/use-cases/resolve-challenge.use-case';
import { FRIEND_CHALLENGE_PORT } from '../../application/friend-challenge/ports/friend-challenge.port';
import { FriendChallengeMongoRepository } from './repositories/friend-challenge-mongo.repository';
import {
  FriendChallengeDocument,
  FriendChallengeSchema,
} from './schemas/friend-challenge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FriendChallengeDocument.name,
        schema: FriendChallengeSchema,
      },
    ]),
  ],
  controllers: [FriendChallengeController],
  providers: [
    CreateChallengeUseCase,
    AcceptChallengeUseCase,
    ResolveChallengeUseCase,
    FriendChallengeMongoRepository,
    {
      provide: FRIEND_CHALLENGE_PORT,
      useClass: FriendChallengeMongoRepository,
    },
  ],
  exports: [FRIEND_CHALLENGE_PORT],
})
export class FriendChallengeModule {}

