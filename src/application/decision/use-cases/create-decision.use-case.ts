import { Inject, Injectable } from '@nestjs/common';
import type { Decision } from '../../../domain/decision/decision.entity';
import { DECISION_PORT, type DecisionPort } from '../ports/decision.port';

@Injectable()
export class CreateDecisionUseCase {
  constructor(
    @Inject(DECISION_PORT)
    private readonly decisionPort: DecisionPort,
  ) {}

  async execute(decision: Decision): Promise<Decision> {
    return this.decisionPort.create(decision);
  }
}

