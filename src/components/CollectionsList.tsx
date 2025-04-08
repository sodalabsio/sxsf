import { Link } from 'react-router-dom';
import { getAllCollections } from '../collections';

const CollectionsList = () => {
  const collections = getAllCollections();

  if (collections.length === 0) {
    return null;
  }

  return (
    <section className="collections-section container">
      <h2 className="section-title">Collections</h2><br />
      <Link to="/" className="back-link">← Back to all stories</Link>
      <div className="collections-grid">
        {collections.map((collection) => (
          <div key={collection.id} className="collection-card">
            <h3 className="collection-title">
              <Link to={`/collection/${collection.id}`}>
                {collection.title}
              </Link>
            </h3>
            <p className="collection-description">{collection.description}</p>
            <Link to={`/collection/${collection.id}`} className="view-collection">
              View Collection
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsList;
