import { Story } from '../types';
import { format, parseISO } from 'date-fns';
import { storyFiles } from '../stories-index';

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

// Load a single story by its slug
const loadStory = async (slug: string): Promise<Story | null> => {
  try {
    // Use dynamic import with a specific path rather than glob pattern
    const module = await import(`../../stories/${slug}.ts`);
    
    // Extract the story object - it could be the default export or named export
    let story: Story | null = null;
    
    if (module.default && isStory(module.default)) {
      story = module.default;
    } else if (module.thisStory && isStory(module.thisStory)) {
      story = module.thisStory;
    } else {
      // Try to find any export that looks like a story
      for (const key in module) {
        if (isStory(module[key])) {
          story = module[key];
          break;
        }
      }
    }
    
    if (!story) {
      console.error(`No valid story found in module for slug: ${slug}`);
      return null;
    }
    
    // Fix image paths
    return fixImagePath(story);
  } catch (error) {
    console.error(`Error loading story with slug ${slug}:`, error);
    return null;
  }
};

// Type guard to check if an object is a Story
function isStory(obj: any): obj is Story {
  return obj && 
         typeof obj === 'object' && 
         'id' in obj && 
         'title' in obj && 
         'content' in obj &&
         'slug' in obj;
}

// This function gets all stories using the index file
export const getAllStories = async (): Promise<Story[]> => {
  try {
    console.log('Loading stories...');
    
    // Load all stories in parallel
    const storyPromises = storyFiles.map(slug => loadStory(slug));
    const storyResults = await Promise.all(storyPromises);
    
    // Filter out any null results (failed loads)
    const stories = storyResults.filter((story): story is Story => story !== null);
    
    console.log(`Loaded ${stories.length} stories`);
    
    // Sort stories by date (newest first)
    const sortedStories = stories.sort((a: Story, b: Story) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Log all story image paths for debugging
    sortedStories.forEach(story => {
      console.log(`Story "${story.title}" image path: ${story.imageUrl}`);
    });
    
    return sortedStories;
  } catch (error) {
    console.error('Error loading stories:', error);
    return [];
  }
};

export const getStoryBySlug = async (slug: string): Promise<Story | null> => {
  console.log(`Looking for story with slug: ${slug}`);
  
  // First try to load the story directly if it's in our index
  if (storyFiles.includes(slug)) {
    const story = await loadStory(slug);
    if (story) {
      console.log(`Found story: ${story.title}`);
      return story;
    }
  }
  
  // If direct loading fails or the slug isn't in our index, fall back to searching all stories
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
