import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleBySlug, getArticlesByCategorySlug, type Article } from '../api';
import RelatedArticlesFeed from './RelatedArticlesFeed';
import './ArticleView.css';
import './ArticleCard.css';

const ArticleView: React.FC = () => {
  const { categorySlug, articleSlug } = useParams<{ categorySlug: string; articleSlug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      try {
        setLoading(true);
        const articleData = await getArticleBySlug(categorySlug!, articleSlug!); 
        setArticle(articleData);

        const relatedData = await getArticlesByCategorySlug(articleData.category.slug);
        setRelatedArticles(relatedData.filter(relatedArticle => relatedArticle.id !== articleData.id));
        
      } catch (err) {
        setError('Failed to fetch article or related articles.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug && articleSlug) {
      fetchArticleAndRelated();
    }
  }, [categorySlug, articleSlug]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/favicon.png" alt="Cargando..." className="loading-logo" />
        <p>Cargando artículo...</p>
      </div>
    );
  }

  if (error) {
    document.title = "Noti42 - Error";
    return <div>Error: {error}</div>;
  }

  if (!article) {
    document.title = "Noti42 - Article Not Found";
    return <div>Article not found.</div>;
  }

  return (
    <>      
      <div className="main-content">
        <div className="container article-view">
          {article.imageUrl && (
            <div className="article-image-container">
              <img src={article.imageUrl} alt={article.title} className="article-image" />
              <div className="article-category">{article.category.name}</div>
            </div>
          )}
          <h1>{article.title}</h1>
          <div className="article-meta">
            <div className="article-author">
              <span className="author-name">{article.author}</span>
            </div>
            <div className="article-details">
              <span className="publish-date">{getTimeAgo(article.publishDate)}</span>
              <span className="reading-time">{article.readingTime} min de lectura</span>
            </div>
          </div>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags">
              {article.tags.map((tag: string, index: number) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="container">
          <RelatedArticlesFeed articles={relatedArticles} currentArticleSlug={article.slug} />
        </div>
      </div>
    </>
  );
};

export default ArticleView;
