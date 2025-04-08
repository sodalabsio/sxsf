import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTags, formatTagForDisplay } from '../utils/tagUtils';

const AllTags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();
        setTags(allTags);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return <div>Loading tags...</div>;
  }

  if (tags.length === 0) {
    return <div>No tags found.</div>;
  }

  return (
    <div className="all-tags">
      <h2>Browse by Tag</h2>
      <div className="tags-cloud">
        {tags.map((tag, index) => (
          <Link 
            key={index} 
            to={`/tag/${tag.toLowerCase()}`}
            className="tag-pill tag-cloud-item"
          >
            {formatTagForDisplay(tag)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllTags;
