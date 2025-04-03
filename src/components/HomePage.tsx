import { useEffect, useState } from 'react';
import StoryCard from './StoryCard';
import { Story } from '../types';
import { getAllStories } from '../utils/storyUtils';

const HomePage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [latestStory, setLatestStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const allStories = await getAllStories();
        setStories(allStories);
        
        // Set the latest story
        if (allStories.length > 0) {
          setLatestStory(allStories[0]); // Stories are already sorted by date in getAllStories
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Loading stories...</h2>
        </div>
      </div>
    );
  }

  // Filter out the latest story from the other stories
  const otherStories = stories.filter(story => 
    latestStory ? story.id !== latestStory.id : true
  );

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Science X Sci-Fi </h1>
          <p>
            Weekly AI-generated Sci-Fi stories by researchers at Monash University inspired by the latest scientific breakthroughs.
            Where imagination meets real science.
          </p>
        </div>
      </section>

      {latestStory && (
        <section className="container">
          <h2 className="section-title">Latest Story</h2>
          <div className="featured-story">
            <StoryCard story={latestStory} featured={true} />
          </div>
        </section>
      )}

      {otherStories.length > 0 && (
        <section className="container">
          <h2 className="section-title">More Stories</h2>
          <div className="stories-grid">
            {otherStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default HomePage;
