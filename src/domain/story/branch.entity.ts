export interface InterfaceResource {
  title: string;
  sub_title: string;
  image: string;
}

export interface OptionBase {
  text: string;
  question: string;
  options: StoryOption[];
}

export interface OptionNextCanonical extends OptionBase {
  option: string;
  next_chapter_id: string;
}

export interface OptionEnd extends InterfaceResource {
  text: string;
}

export type StoryOption = OptionBase | OptionNextCanonical | OptionEnd;

export interface Branch extends InterfaceResource {
  option: string;
  text: string;
  question: string;
  options: StoryOption[];
}

