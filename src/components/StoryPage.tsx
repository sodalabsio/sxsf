import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Story } from '../types';
import { getStoryBySlug, formatDate } from '../utils/storyUtils';
import ReadNext from './ReadNext';
import TagsList from './TagsList';

const StoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const imageLoadAttempted = useRef(false);

  // Placeholder image for fallback
  const placeholderImage = 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;
      
      try {
        console.log(`Fetching story with slug: ${slug}`);
        const fetchedStory = await getStoryBySlug(slug);
        
        if (fetchedStory) {
          console.log(`Story found: ${fetchedStory.title}`);
          console.log(`Story image URL: ${fetchedStory.imageUrl}`);
          setStory(fetchedStory);
          
          // Only attempt to load the image once
          if (!imageLoadAttempted.current) {
            imageLoadAttempted.current = true;
            
            // Pre-load the image to check if it exists
            const img = new Image();
            img.onload = () => setImageError(false);
            img.onerror = () => {
              console.error(`Failed to load hero image: ${fetchedStory.imageUrl}`);
              setImageError(true);
            };
            img.src = fetchedStory.imageUrl;
          }
        } else {
          console.error(`Story not found for slug: ${slug}`);
          // Story not found, redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug, navigate]);

  // Reset the image load attempt flag when the slug changes
  useEffect(() => {
    imageLoadAttempted.current = false;
    setImageError(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Loading story...</h2>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Story not found</h2>
        </div>
      </div>
    );
  }

  // Use the actual image URL or fallback to placeholder if there was an error
  const imageUrl = imageError ? placeholderImage : story.imageUrl;

  return (
    <main>
      <div className="story-hero">
        <div className="story-hero-overlay"></div>
        <div 
          className="story-hero-image" 
          style={{ 
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container">
          <header className="story-header">
            <h1 className="story-title">{story.title}</h1>
            <p className="story-date">{formatDate(story.date)}</p>
            {story.tags && story.tags.length > 0 && (
              <TagsList tags={story.tags} className="story-tags" />
            )}
          </header>
        </div>
      </div>
      
      <div className="story-container">
        <div className="story-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {story.content}
          </ReactMarkdown>
        </div>
        
        {story.references && story.references.length > 0 && (
          <div className="references">
            <h3>Scientific References</h3>
            {story.references.map((reference) => (
              <div key={reference.id} className="reference-item">
                <h4 className="reference-title">{reference.title}</h4>
                <p>{reference.description}</p>
                <a 
                  href={reference.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="reference-url"
                >
                  {reference.url}
                </a>
              </div>
            ))}
          </div>
        )}
        
        <ReadNext currentStoryId={story.id} />
      </div>
    </main>
  );
};

export default StoryPage;
