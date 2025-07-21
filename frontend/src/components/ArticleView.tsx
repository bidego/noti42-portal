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
        
      } catch (err) {
        setError('Failed to fetch article.');
        
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  

  if (loading) {
    document.title = "Noti42 - Loading Article...";
    return <div>Loading...</div>;
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
      <title>{`Noti42 - ${article.title}`}</title>
      <meta name="description" content={article.content.substring(0, 160)} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.content.substring(0, 160)} />
      {article.imageUrl && <meta property="og:image" content={article.imageUrl} />}
      <meta property="og:type" content="article" />
      
      <div className="main-content">
        <div className="container article-view">
          {article.imageUrl && (
            <img src={article.imageUrl} alt={article.title} className="article-image" />
          )}
          <h1>{article.title}</h1>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </>
  );
};

export default ArticleView;
