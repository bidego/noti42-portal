import { Link } from 'react-router-dom';
import type { Article } from '../api';
import './ArticleCard.css';

interface ArticleCardProps extends Article {
  variant?: 'default' | 'featured' | 'secondary';
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  summary,
  imageUrl,
  category,
  author,
  publishDate,
  readingTime,
  tags,
  variant = 'default'
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    return formatDate(dateString);
  };

  return (
    <article className={`article-card ${variant}`}>
      <Link to={`/articles/${id}`} className="article-link">
        <div className="article-image-container">
          <img 
            src={imageUrl} 
            alt={title}
            className="article-image"
          />
          <div className="article-category">
            {category.name}
          </div>
        </div>
        
        <div className="article-content">
          <h3 className="article-title">{title}</h3>
          <p className="article-summary">{summary}</p>
          
          <div className="article-meta">
            <div className="article-author">
              <span className="author-name">{author}</span>
            </div>
            <div className="article-details">
              <span className="publish-date">{getTimeAgo(publishDate)}</span>
              <span className="reading-time">{readingTime} min de lectura</span>
            </div>
          </div>
          
          {tags && tags.length > 0 && (
            <div className="article-tags">
              {tags.slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;