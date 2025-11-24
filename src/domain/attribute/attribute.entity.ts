export interface Attribute {
  id?: string;
  name: string;
  description?: string;
  type: 'energy' | 'money' | 'mana' | 'health' | 'level' | 'custom';
  default_value?: number;
  min_value?: number;
  max_value?: number;
  created_at?: Date;
  updated_at?: Date;
}

