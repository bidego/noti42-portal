import { Link } from 'react-router-dom';
import type { Article } from '../api';
import './HeroArticle.css';

interface HeroArticleProps {
  article: Article;
}

const HeroArticle: React.FC<HeroArticleProps> = ({ article }) => {
  const { title, summary, imageUrl, category, author, publishDate, readingTime, slug } = article;

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <section className="hero-article">
      <Link to={`/articles/slug/${slug}`} className="hero-link">
        <div className="hero-container">
          <div className="hero-image-container">
            <img src={imageUrl} alt={title} className="hero-image" />
            <div className="hero-overlay">
              <div className="hero-category">{category.name}</div>
              <div className="hero-content">
                <h1 className="hero-title">{title}</h1>
                <p className="hero-summary">{summary}</p>
                <div className="hero-meta">
                  <span className="hero-author">Por {author}</span>
                  <span className="hero-date">{getTimeAgo(publishDate)}</span>
                  <span className="hero-reading-time">{readingTime} min de lectura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default HeroArticle;
