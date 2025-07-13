import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../api'; // Assuming this function will be created

interface Article {
  id: string;
  title: string;
  content: string;
  // Add other article properties as needed
}

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getArticleById(id!); // Call the API function
        setArticle(data);
      } catch (err) {
        setError('Failed to fetch article.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div className="article-view">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      {/* Render other article details here */}
    </div>
  );
};

export default ArticleView;
