import { Link } from 'react-router-dom';
import { Story } from '../types';
import { formatDate } from '../utils/storyUtils';
import TagsList from './TagsList';

interface StoryCardProps {
  story: Story;
  featured?: boolean;
}

const StoryCard = ({ story, featured = false }: StoryCardProps) => {
  // Use a placeholder image if the story image is not available
  const placeholderImage = 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  return (
    <div className={`story-card ${featured ? 'featured-story-card' : ''}`}>
      <Link to={`/story/${story.slug}`} className="story-card-image-container">
        <img 
          src={story.imageUrl} 
          alt={story.title} 
          className="story-card-image" 
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = placeholderImage;
            console.error(`Failed to load image: ${story.imageUrl}`);
          }}
        />
      </Link>
      <div className="story-card-content">
        <h3 className="story-card-title">
          <Link to={`/story/${story.slug}`} className="story-title-link">
            {story.title}
          </Link>
        </h3>
        <p className="story-card-date">{formatDate(story.date)}</p>
        {story.tags && story.tags.length > 0 && (
          <TagsList tags={story.tags} className="story-card-tags" />
        )}
        <p className="story-card-excerpt">{story.excerpt}</p>
        <Link to={`/story/${story.slug}`} className="read-more">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
