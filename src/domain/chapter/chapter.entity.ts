export interface Chapter {
  chapter_id: string;
  book_id: string;
  title: string;
  description: string;
  chapter_number: number;
  is_unlocked_by_default: boolean;
  unlock_requirements?: {
    previous_chapter_id?: string;
    required_canonical_events?: string[];
    required_attributes?: Record<string, number>;
  };
  created_at: Date;
  updated_at: Date;
}
