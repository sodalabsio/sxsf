import { Story } from '../types';
import { format, parseISO } from 'date-fns';

// Add type declaration for Vite's import.meta.glob
interface ImportModule {
  (): Promise<any>;
}

// Helper function to fix image paths
const fixImagePath = (story: Story): Story => {
  // Clone the story to avoid modifying the original
  const updatedStory = { ...story };
  
  // If the image path is relative (starts with ../ or ./ or assets/)
  if (updatedStory.imageUrl.startsWith('../') || 
      updatedStory.imageUrl.startsWith('./') || 
      updatedStory.imageUrl.startsWith('assets/')) {
    
    // Remove the leading ../ or ./ and ensure we have a clean path
    let cleanPath = updatedStory.imageUrl;
    cleanPath = cleanPath.replace(/^(\.\.\/)+|^(\.\/)+/, '');
    
    // If the path doesn't start with 'assets/', add it
    if (!cleanPath.startsWith('assets/')) {
      cleanPath = `assets/${cleanPath.replace(/^assets\//, '')}`;
    }
    
    // In development, we need a different path than in production
    if (import.meta.env.DEV) {
      // For development, use a path relative to the root
      updatedStory.imageUrl = `/${cleanPath}`;
    } else {
      // For production (GitHub Pages), use the BASE_URL
      updatedStory.imageUrl = `${import.meta.env.BASE_URL}${cleanPath}`;
    }
    
    console.log(`Fixed image path: ${story.imageUrl} -> ${updatedStory.imageUrl}`);
  }
  
  return updatedStory;
};

// This function dynamically imports all story files from the data directory
export const getAllStories = async (): Promise<Story[]> => {
  try {
    console.log('Loading stories...');
    // Use Vite's import.meta.glob to dynamically import all .ts files in the data directory
    const storyModules: Record<string, ImportModule> = import.meta.glob('../../stories/*.ts');
    console.log(`Found ${Object.keys(storyModules).length} story modules`);
    
    const storyPromises = Object.values(storyModules).map((importStory: ImportModule) => importStory());
    
    // Wait for all story modules to be imported
    const modules = await Promise.all(storyPromises);
    
    // Extract the story objects from the modules and flatten the array
    const stories = modules.flatMap((module: any) => {
      // Each module might export the story under different names, so we check all exports
      const exports = Object.values(module);
      return exports.filter(exp => 
        exp && typeof exp === 'object' && 
        'id' in exp && 'title' in exp && 'content' in exp
      ) as Story[];
    });
    
    console.log(`Extracted ${stories.length} stories`);
    
    // Fix image paths and sort stories by date (newest first)
    const processedStories = stories
      .map(fixImagePath)
      .sort((a: Story, b: Story) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    
    // Log all story image paths for debugging
    processedStories.forEach(story => {
      console.log(`Story "${story.title}" image path: ${story.imageUrl}`);
    });
    
    return processedStories;
  } catch (error) {
    console.error('Error loading stories:', error);
    return [];
  }
};

export const getStoryBySlug = async (slug: string): Promise<Story | null> => {
  console.log(`Looking for story with slug: ${slug}`);
  const allStories = await getAllStories();
  const story = allStories.find(story => story.slug === slug) || null;
  console.log(story ? `Found story: ${story.title}` : `No story found with slug: ${slug}`);
  return story;
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
