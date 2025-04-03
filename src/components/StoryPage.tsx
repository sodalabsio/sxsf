import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Story } from '../types';
import { getStoryBySlug, formatDate } from '../utils/storyUtils';
import ReadNext from './ReadNext';

const StoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;
      
      try {
        const fetchedStory = await getStoryBySlug(slug);
        if (fetchedStory) {
          setStory(fetchedStory);
        } else {
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

  return (
    <main>
      <div className="story-hero">
        <div className="story-hero-overlay"></div>
        <div 
          className="story-hero-image" 
          style={{ 
            backgroundImage: `url("${story.imageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container">
          <header className="story-header">
            <h1 className="story-title">{story.title}</h1>
            <p className="story-date">{formatDate(story.date)}</p>
          </header>
        </div>
      </div>
      
      <div className="story-container">
        <div className="story-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {story.content}
          </ReactMarkdown>
        </div>
        
        {story.references.length > 0 && (
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
