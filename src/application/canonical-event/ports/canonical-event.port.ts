import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';

export interface CanonicalEventPort {
  create(event: CanonicalEvent): Promise<CanonicalEvent>;
  findById(id: string): Promise<CanonicalEvent | null>;
  findAll(): Promise<CanonicalEvent[]>;
  findByTriggerStage(stageId: string): Promise<CanonicalEvent[]>;
  update(id: string, event: Partial<CanonicalEvent>): Promise<CanonicalEvent>;
}

export const CANONICAL_EVENT_PORT = Symbol('CANONICAL_EVENT_PORT');

