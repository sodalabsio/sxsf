#!/usr/bin/env node

/**
 * This script compiles all stories into a single static JSON file
 * to avoid dynamic imports in production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transformFileSync } from '@babel/core';
import ts from '@babel/preset-typescript';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the stories directory
const storiesDir = path.join(__dirname, '../stories');

// Path to the output file
const outputFile = path.join(__dirname, '../src/stories-data.json');

// Get all .ts files in the stories directory
const storyFiles = fs.readdirSync(storiesDir)
  .filter(file => file.endsWith('.ts'));

// Process each story file
const stories = [];

for (const file of storyFiles) {
  const filePath = path.join(storiesDir, file);
  const slug = file.replace('.ts', '');
  
  try {
    // Transform TypeScript to JavaScript
    const result = transformFileSync(filePath, {
      presets: [ts],
      configFile: false
    });
    
    // Create a temporary file to execute
    const tempFile = path.join(__dirname, `temp-${slug}.js`);
    fs.writeFileSync(tempFile, result.code);
    
    // Import the story
    const storyModule = await import(`file://${tempFile}`);
    
    // Find the story object
    let story = null;
    if (storyModule.default) {
      story = storyModule.default;
    } else if (storyModule.thisStory) {
      story = storyModule.thisStory;
    } else {
      // Try to find any export that looks like a story
      for (const key in storyModule) {
        if (storyModule[key] && 
            typeof storyModule[key] === 'object' && 
            'id' in storyModule[key] && 
            'title' in storyModule[key] && 
            'content' in storyModule[key]) {
          story = storyModule[key];
          break;
        }
      }
    }
    
    if (story) {
      stories.push(story);
      console.log(`Processed story: ${story.title}`);
    } else {
      console.error(`No story found in ${file}`);
    }
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}

// Write the stories to the output file
fs.writeFileSync(outputFile, JSON.stringify(stories, null, 2));

console.log(`Generated static data file with ${stories.length} stories`);
