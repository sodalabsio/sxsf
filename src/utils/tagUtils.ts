import { Story } from '../types';
import { getAllStories } from './storyUtils';

// Get all unique tags from all stories
export const getAllTags = async (): Promise<string[]> => {
  const stories = await getAllStories();
  
  // Extract all tags from all stories
  const allTags = stories.reduce((tags: string[], story: Story) => {
    if (story.tags && story.tags.length > 0) {
      return [...tags, ...story.tags];
    }
    return tags;
  }, []);
  
  // Remove duplicates and sort alphabetically
  const uniqueTags = [...new Set(allTags)].sort();
  
  return uniqueTags;
};

// Get stories by tag
export const getStoriesByTag = async (tag: string): Promise<Story[]> => {
  const stories = await getAllStories();
  
  // Normalize the tag for comparison (lowercase)
  const normalizedTag = tag.toLowerCase();
  
  // Filter stories that have the specified tag
  return stories.filter(story => 
    story.tags?.some(storyTag => 
      storyTag.toLowerCase() === normalizedTag
    ) || false
  );
};

// Get stories that have all the specified tags
export const getStoriesByTags = async (tags: string[]): Promise<Story[]> => {
  const stories = await getAllStories();
  
  // Normalize the tags for comparison (lowercase)
  const normalizedTags = tags.map(tag => tag.toLowerCase());
  
  // Filter stories that have all the specified tags
  return stories.filter(story => 
    normalizedTags.every(tag => 
      story.tags?.some(storyTag => storyTag.toLowerCase() === tag) || false
    )
  );
};

// Format a tag for display (capitalize words, replace hyphens with spaces)
export const formatTagForDisplay = (tag: string): string => {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
