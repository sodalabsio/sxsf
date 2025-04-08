import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Story, Collection } from '../types';
import { getAllStories } from '../utils/storyUtils';
import StoryCard from './StoryCard';
import { collections } from '../collections';

const CollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        
        // Find the collection by ID
        const foundCollection = collections.find(c => c.id === id) || null;
        setCollection(foundCollection);
        
        if (foundCollection) {
          const allStories = await getAllStories();
          
          // Filter stories that have ALL the tags in the collection
          // Tags are already in hyphenated lowercase format
          const filteredStories = allStories.filter(story => 
            foundCollection.tags.every(collectionTag => 
              story.tags?.some(storyTag => 
                storyTag.toLowerCase() === collectionTag.toLowerCase()
              ) || false
            )
          );
          
          setStories(filteredStories);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchCollection();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Loading collection...</h2>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Collection not found</h2>
          <Link to="/" className="back-link">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="container">
        <div className="collection-header">
          <h1>{collection.title}</h1>
          <p className="collection-description">{collection.description}</p>
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
            <p>No stories found in this collection.</p>
            <Link to="/" className="back-link">View all stories</Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default CollectionPage;
