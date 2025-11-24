import { Inject, Injectable } from '@nestjs/common';
import type { OptionAttributeEffect } from '../../../domain/attribute/option-attribute-effect.entity';
import {
  OPTION_ATTRIBUTE_EFFECT_PORT,
  type OptionAttributeEffectPort,
} from '../ports/option-attribute-effect.port';

@Injectable()
export class LinkAttributeEffectToOptionUseCase {
  constructor(
    @Inject(OPTION_ATTRIBUTE_EFFECT_PORT)
    private readonly effectPort: OptionAttributeEffectPort,
  ) {}

  async execute(effect: OptionAttributeEffect): Promise<OptionAttributeEffect> {
    return this.effectPort.create(effect);
  }
}

