
export interface ContentSection {
  id: string;
  title: string;
  icon: string;
  content: string | string[];
  summary?: string;
}

export interface ThanaData {
  introduction: ContentSection;
  history: ContentSection;
  geography: ContentSection;
  administration: ContentSection;
  population: ContentSection;
  education: ContentSection;
  economy: ContentSection;
  communication: ContentSection;
  notable: ContentSection;
}
