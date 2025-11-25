export interface Franchise {
  franchise_id: string;
  name: string;
  description: string;
  author?: string;
  genre?: string[];
  cover_image?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
