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
  tags?: string[]; // Optional array of tags for the story
}

// Interface for tag-based collections
export interface Collection {
  id: string;
  title: string;
  description: string;
  tags: string[]; // Tags that define this collection
}
