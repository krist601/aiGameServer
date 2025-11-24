import { Body, Controller, Param, Post } from '@nestjs/common';
import type { FriendChallenge } from '../../../domain/friend-challenge/friend-challenge.entity';
import { CreateChallengeUseCase } from '../../../application/friend-challenge/use-cases/create-challenge.use-case';
import { AcceptChallengeUseCase } from '../../../application/friend-challenge/use-cases/accept-challenge.use-case';
import { ResolveChallengeUseCase } from '../../../application/friend-challenge/use-cases/resolve-challenge.use-case';

@Controller('challenge')
export class FriendChallengeController {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase,
    private readonly acceptChallengeUseCase: AcceptChallengeUseCase,
    private readonly resolveChallengeUseCase: ResolveChallengeUseCase,
  ) {}

  @Post()
  async create(@Body() challenge: FriendChallenge): Promise<FriendChallenge> {
    return this.createChallengeUseCase.execute(challenge);
  }

  @Post(':id/accept')
  async accept(@Param('id') challengeId: string): Promise<FriendChallenge> {
    return this.acceptChallengeUseCase.execute(challengeId);
  }

  @Post(':id/resolve')
  async resolve(
    @Param('id') challengeId: string,
    @Body() body: { success: boolean },
  ): Promise<FriendChallenge> {
    return this.resolveChallengeUseCase.execute(challengeId, body.success);
  }
}

