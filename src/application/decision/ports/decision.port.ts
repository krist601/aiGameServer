import type { Decision } from '../../../domain/decision/decision.entity';

export interface DecisionPort {
  create(decision: Decision): Promise<Decision>;
  findById(id: string): Promise<Decision | null>;
  findByStageId(stageId: string): Promise<Decision[]>;
}

export const DECISION_PORT = Symbol('DECISION_PORT');

