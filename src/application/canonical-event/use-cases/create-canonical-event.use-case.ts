import { Inject, Injectable } from '@nestjs/common';
import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';
import {
  CANONICAL_EVENT_PORT,
  type CanonicalEventPort,
} from '../ports/canonical-event.port';

@Injectable()
export class CreateCanonicalEventUseCase {
  constructor(
    @Inject(CANONICAL_EVENT_PORT)
    private readonly canonicalEventPort: CanonicalEventPort,
  ) {}

  async execute(event: CanonicalEvent): Promise<CanonicalEvent> {
    return this.canonicalEventPort.create(event);
  }
}

