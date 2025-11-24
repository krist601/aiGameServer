export interface StoryStage {
  id?: string;
  name: string;
  scene: string;
  title: string;
  sub_title: string;
  image: string;
  text: string;
  question: string;
  is_canonical_progress: boolean;
  canonical_event?: string;
  chapter?: string;
  created_at?: Date;
  updated_at?: Date;
}

