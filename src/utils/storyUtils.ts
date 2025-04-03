import { Story } from '../types';
import { format, parseISO } from 'date-fns';

// This function dynamically imports all story files from the data directory
export const getAllStories = async (): Promise<Story[]> => {
  try {
    // Use Vite's import.meta.glob to dynamically import all .ts files in the data directory
    const storyModules = import.meta.glob('../../stories/*.ts');
    const storyPromises = Object.values(storyModules).map(importStory => importStory());
    
    // Wait for all story modules to be imported
    const modules = await Promise.all(storyPromises);
    
    // Extract the story objects from the modules and flatten the array
    const stories = modules.flatMap(module => {
      // Each module might export the story under different names, so we check all exports
      const exports = Object.values(module);
      return exports.filter(exp => 
        exp && typeof exp === 'object' && 
        'id' in exp && 'title' in exp && 'content' in exp
      ) as Story[];
    });
    
    // Sort stories by date (newest first)
    return stories.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading stories:', error);
    return [];
  }
};

export const getStoryBySlug = async (slug: string): Promise<Story | null> => {
  const allStories = await getAllStories();
  return allStories.find(story => story.slug === slug) || null;
};

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Get related stories (excluding the current one)
export const getRelatedStories = async (currentStoryId: string, limit: number = 3): Promise<Story[]> => {
  const allStories = await getAllStories();
  
  // Filter out the current story and get up to 'limit' other stories
  return allStories
    .filter(story => story.id !== currentStoryId)
    .sort(() => 0.5 - Math.random()) // Simple random shuffle
    .slice(0, limit);
};
