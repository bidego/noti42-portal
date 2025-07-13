import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticlesByCategorySlug, getCategories, type Article } from '../api';
import ArticleGrid from './ArticleGrid';

const CategoryView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await getArticlesByCategorySlug(slug!); 
        setArticles(fetchedArticles);

        const fetchedCategories = await getCategories();
        const currentCategory = fetchedCategories.find(cat => cat.name.toLowerCase() === slug?.toLowerCase());
        setCategoryName(currentCategory ? currentCategory.name : slug || null);

      } catch (err) {
        setError('Failed to fetch articles or category information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <div className="container">Loading articles...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  if (articles.length === 0) {
    return <div className="container">No articles found for {categoryName || slug}.</div>;
  }

  return (
    <div className="main-content">
      <div className="container">
        <h1>Category: {categoryName || slug}</h1>
        <ArticleGrid articles={articles} />
      </div>
    </div>
  );
};

export default CategoryView;
