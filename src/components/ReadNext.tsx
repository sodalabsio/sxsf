import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Story } from '../types';
import { getRelatedStories, formatDate } from '../utils/storyUtils';

interface ReadNextProps {
  currentStoryId: string;
}

const ReadNext = ({ currentStoryId }: ReadNextProps) => {
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Placeholder image for fallback
  const placeholderImage = 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  useEffect(() => {
    const fetchRelatedStories = async () => {
      try {
        const stories = await getRelatedStories(currentStoryId, 3);
        setRelatedStories(stories);
        
        // Initialize image error tracking
        const initialErrors: Record<string, boolean> = {};
        stories.forEach(story => {
          initialErrors[story.id] = false;
        });
        setImageErrors(initialErrors);
        
        // Pre-load images to check if they exist
        stories.forEach(story => {
          const img = new Image();
          img.onload = () => {
            setImageErrors(prev => ({ ...prev, [story.id]: false }));
          };
          img.onerror = () => {
            console.error(`Failed to load read-next image: ${story.imageUrl}`);
            setImageErrors(prev => ({ ...prev, [story.id]: true }));
          };
          img.src = story.imageUrl;
        });
      } catch (error) {
        console.error('Error fetching related stories:', error);
      }
    };

    fetchRelatedStories();
  }, [currentStoryId]);

  if (relatedStories.length === 0) {
    return null;
  }

  return (
    <div className="read-next">
      <h3>Read Next</h3>
      <div className="read-next-grid">
        {relatedStories.map(story => {
          // Use the actual image URL or fallback to placeholder if there was an error
          const imageUrl = imageErrors[story.id] ? placeholderImage : story.imageUrl;
          
          return (
            <div key={story.id} className="story-card">
              <Link to={`/story/${story.slug}`} className="story-card-image-container">
                <img 
                  src={imageUrl} 
                  alt={story.title} 
                  className="story-card-image" 
                />
              </Link>
              <div className="story-card-content">
                <h4 className="story-card-title">
                  <Link to={`/story/${story.slug}`} className="story-title-link">
                    {story.title}
                  </Link>
                </h4>
                <p className="story-card-date">{formatDate(story.date)}</p>
                <Link to={`/story/${story.slug}`} className="read-more">
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadNext;
