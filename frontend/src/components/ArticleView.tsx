import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleBySlug, type Article } from '../api';
import './ArticleView.css';

const ArticleView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getArticleBySlug(slug!); 
        setArticle(data);
        document.title = `Noti42 - ${data.title}`;
      } catch (err) {
        setError('Failed to fetch article.');
        document.title = "Noti42 - Error";
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    } else {
      document.title = "Noti42 - Article Not Found";
    }
  }, [slug]);

  if (loading) {
    document.title = "Noti42 - Loading Article...";
    return <div>Loading article...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    document.title = "Noti42 - Article Not Found";
    return <div>Article not found.</div>;
  }

  return (
    <div className="main-content">
      <div className="container article-view">
        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} className="article-image" />
        )}
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleView;
