import { Inject, Injectable } from '@nestjs/common';
import type { DecisionOption } from '../../../domain/decision/decision-option.entity';
import {
  DECISION_OPTION_PORT,
  type DecisionOptionPort,
} from '../ports/decision-option.port';

@Injectable()
export class CreateDecisionOptionUseCase {
  constructor(
    @Inject(DECISION_OPTION_PORT)
    private readonly decisionOptionPort: DecisionOptionPort,
  ) {}

  async execute(option: DecisionOption): Promise<DecisionOption> {
    return this.decisionOptionPort.create(option);
  }
}

