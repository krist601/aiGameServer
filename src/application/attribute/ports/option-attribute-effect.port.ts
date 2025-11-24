import type { OptionAttributeEffect } from '../../../domain/attribute/option-attribute-effect.entity';

export interface OptionAttributeEffectPort {
  create(effect: OptionAttributeEffect): Promise<OptionAttributeEffect>;
  findByOptionId(optionId: string): Promise<OptionAttributeEffect[]>;
  delete(id: string): Promise<void>;
}

export const OPTION_ATTRIBUTE_EFFECT_PORT = Symbol('OPTION_ATTRIBUTE_EFFECT_PORT');

