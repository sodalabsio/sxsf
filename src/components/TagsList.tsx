import TagPill from './TagPill';

interface TagsListProps {
  tags: string[];
  className?: string;
}

const TagsList = ({ tags, className = '' }: TagsListProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`tags-list ${className}`}>
      {tags.map((tag, index) => (
        <TagPill key={index} tag={tag} />
      ))}
    </div>
  );
};

export default TagsList;
