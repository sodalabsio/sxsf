import { Story } from '../types';
import { format, parseISO } from 'date-fns';

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

// Type guard to check if an object is a valid module
function isValidModule(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object';
}

// Type guard to check if an object is a Story
function isStory(obj: unknown): obj is Story {
  return obj !== null && 
         typeof obj === 'object' && 
         'id' in obj && 
         'title' in obj && 
         'content' in obj &&
         'slug' in obj;
}

// This function gets all stories
export const getAllStories = async (): Promise<Story[]> => {
  try {
    console.log('Loading stories...');
    
    let stories: Story[] = [];
    
    // In production, use the static data file
    if (import.meta.env.PROD) {
      try {
        // Fixed URL construction to ensure the base path is included
        const baseUrl = import.meta.env.BASE_URL || '/';
        // Ensure baseUrl ends with a slash
        const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        // Construct the full URL for stories-data.json
        const dataUrl = new URL(
          'stories-data.json', 
          window.location.origin + normalizedBaseUrl
        ).href;
        
        console.log(`Fetching stories data from: ${dataUrl}`);
        
        // Fetch the static JSON file
        const response = await fetch(dataUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch stories data: ${response.statusText}`);
        }
        stories = await response.json();
        console.log(`Loaded ${stories.length} stories from static data`);
      } catch (error) {
        console.error('Error fetching stories data:', error);
        // Fall back to empty array
        stories = [];
      }
    } 
    // In development, use dynamic imports for a better dev experience
    else {
      // Use dynamic import to load all story files
      const storyModules = import.meta.glob('../../stories/*.ts');
      const storyPromises = Object.values(storyModules).map(importStory => importStory());
      
      // Wait for all story modules to be imported
      const modules = await Promise.all(storyPromises);
      
      // Extract the story objects from the modules
      stories = modules.flatMap(module => {
        if (!isValidModule(module)) {
          return [];
        }
        
        // Each module might export the story under different names, so we check all exports
        const exports = Object.values(module);
        return exports.filter(isStory);
      });
      
      console.log(`Loaded ${stories.length} stories from dynamic imports`);
    }
    
    // Fix image paths and sort stories by date (newest first)
    const processedStories = stories
      .map(fixImagePath)
      .sort((a: Story, b: Story) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    
    return processedStories;
  } catch (error) {
    console.error('Error loading stories:', error);
    return [];
  }
};

export const getStoryBySlug = async (slug: string): Promise<Story | null> => {
  console.log(`Looking for story with slug: ${slug}`);
  const allStories = await getAllStories();
  const story = allStories.find(s => s.slug === slug) || null;
  
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
