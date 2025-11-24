import type { OptionAttributeEffect } from '../attribute/option-attribute-effect.entity';
import type { AttributeRequirement } from '../attribute/attribute-requirement.entity';

export interface DecisionOption {
  id?: string;
  decision_id: string;
  type: 'dialogue' | 'action' | 'choice';
  text: string;
  result_text?: string;
  next_stage_id?: string;
  next_scene?: string;
  canonical_target_order?: number;
  attribute_effects?: OptionAttributeEffect[];
  attribute_requirements?: AttributeRequirement[];
  created_at?: Date;
  updated_at?: Date;
}

