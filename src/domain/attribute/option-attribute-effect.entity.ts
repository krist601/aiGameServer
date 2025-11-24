export interface OptionAttributeEffect {
  id?: string;
  decision_option_id: string;
  attribute_name: string;
  description?: string;
  energy_effect?: number;
  money_effect?: number;
  mana_effect?: number;
  health_effect?: number;
  custom_effect?: Record<string, unknown>;
  created_at?: Date;
  updated_at?: Date;
}

