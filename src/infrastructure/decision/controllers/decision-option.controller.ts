import { Body, Controller, Param, Post } from '@nestjs/common';
import type { DecisionOption } from '../../../domain/decision/decision-option.entity';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import { CreateDecisionOptionUseCase } from '../../../application/decision/use-cases/create-decision-option.use-case';
import { ResolveDecisionOptionUseCase } from '../../../application/decision/use-cases/resolve-decision-option.use-case';

@Controller('decision-option')
export class DecisionOptionController {
  constructor(
    private readonly createDecisionOptionUseCase: CreateDecisionOptionUseCase,
    private readonly resolveDecisionOptionUseCase: ResolveDecisionOptionUseCase,
  ) {}

  @Post()
  async create(@Body() option: DecisionOption): Promise<DecisionOption> {
    return this.createDecisionOptionUseCase.execute(option);
  }

  @Post('resolve/:id')
  async resolve(
    @Param('id') optionId: string,
    @Body() body: { player_id: string },
  ): Promise<{ option: DecisionOption; updatedSave: PlayerSave }> {
    return this.resolveDecisionOptionUseCase.execute(optionId, body.player_id);
  }
}

