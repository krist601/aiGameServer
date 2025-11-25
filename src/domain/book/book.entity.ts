export interface Book {
  book_id: string;
  franchise_id: string;
  title: string;
  description: string;
  volume_number: number;
  cover_image?: string;
  is_published: boolean;
  estimated_duration?: number; // in minutes
  created_at: Date;
  updated_at: Date;
}
