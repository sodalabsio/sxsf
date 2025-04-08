import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Story } from '../types';
import { getAllStories } from '../utils/storyUtils';
import StoryCard from './StoryCard';

const TagCollection = () => {
  const { tag } = useParams<{ tag: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // We'll use the tag directly as it comes from the URL
  // since the tags in the stories are already hyphenated lowercase
  const tagValue = tag || '';

  useEffect(() => {
    const fetchStoriesByTag = async () => {
      try {
        setLoading(true);
        const allStories = await getAllStories();
        
        // Filter stories that have the current tag
        // We're comparing directly with the hyphenated tag from the URL
        const filteredStories = allStories.filter(story => 
          story.tags && story.tags.some(storyTag => 
            storyTag.toLowerCase() === tagValue.toLowerCase()
          )
        );
        
        setStories(filteredStories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories by tag:', error);
        setLoading(false);
      }
    };

    if (tag) {
      fetchStoriesByTag();
    }
  }, [tag, tagValue]);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Loading stories...</h2>
        </div>
      </div>
    );
  }

  // For display purposes, replace hyphens with spaces and capitalize words
  const displayTag = tagValue
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main>
      <section className="container">
        <div className="tag-collection-header">
          <h1>Stories tagged: <span className="highlight">{displayTag}</span></h1>
          <Link to="/" className="back-link">← Back to all stories</Link>
        </div>

        {stories.length > 0 ? (
          <div className="stories-grid">
            {stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="no-stories">
            <p>No stories found with the tag "{displayTag}".</p>
            <Link to="/" className="back-link">View all stories</Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default TagCollection;
