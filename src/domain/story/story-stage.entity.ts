export interface StoryStage {
  id?: string;
  chapter_id: string; // Referencia al capítulo
  name: string;
  scene: string;
  title: string;
  sub_title: string;
  image: string;
  text: string;
  question: string;
  stage_order: number; // Orden dentro del capítulo
  is_canonical_progress: boolean;
  canonical_event?: string;
  created_at?: Date;
  updated_at?: Date;
}

