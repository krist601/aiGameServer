import type { DecisionOption } from '../../../domain/decision/decision-option.entity';

export interface DecisionOptionPort {
  create(option: DecisionOption): Promise<DecisionOption>;
  findById(id: string): Promise<DecisionOption | null>;
  findByDecisionId(decisionId: string): Promise<DecisionOption[]>;
  update(id: string, option: Partial<DecisionOption>): Promise<DecisionOption>;
}

export const DECISION_OPTION_PORT = Symbol('DECISION_OPTION_PORT');

