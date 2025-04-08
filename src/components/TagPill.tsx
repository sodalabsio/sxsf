import { Link } from 'react-router-dom';

interface TagPillProps {
  tag: string;
  className?: string;
}

const TagPill = ({ tag, className = '' }: TagPillProps) => {
  // Since tags are already in URL-friendly format (hyphenated lowercase),
  // we can use them directly in the URL
  const tagSlug = tag.toLowerCase();
  
  // For display purposes, replace hyphens with spaces and capitalize words
  const displayTag = tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <Link 
      to={`/tag/${tagSlug}`} 
      className={`tag-pill ${className}`}
      onClick={(e) => {
        // Prevent event propagation to parent links
        e.stopPropagation();
      }}
    >
      {displayTag}
    </Link>
  );
};

export default TagPill;
