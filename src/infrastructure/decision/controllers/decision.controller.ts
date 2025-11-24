import { Body, Controller, Post } from '@nestjs/common';
import type { Decision } from '../../../domain/decision/decision.entity';
import { CreateDecisionUseCase } from '../../../application/decision/use-cases/create-decision.use-case';

@Controller('decision')
export class DecisionController {
  constructor(
    private readonly createDecisionUseCase: CreateDecisionUseCase,
  ) {}

  @Post()
  async create(@Body() decision: Decision): Promise<Decision> {
    return this.createDecisionUseCase.execute(decision);
  }
}

