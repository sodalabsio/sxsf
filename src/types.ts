export interface Reference {
  id: number;
  title: string;
  url: string;
  description: string;
}

export interface Story {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  references: Reference[];
}
