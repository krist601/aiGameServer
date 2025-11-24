export interface AttributeRequirement {
  id?: string;
  decision_option_id: string;
  attribute_name: string;
  level_required?: number;
  health_required?: number;
  energy_required?: number;
  mana_required?: number;
  custom_requirement?: Record<string, unknown>;
  created_at?: Date;
  updated_at?: Date;
}

