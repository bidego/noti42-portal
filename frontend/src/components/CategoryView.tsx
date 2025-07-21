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
        document.title = `Noti42 - ${currentCategory ? currentCategory.name : slug || 'Category'}`;

      } catch (err) {
        setError('Failed to fetch articles or category information.');
        document.title = "Noti42 - Error";
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    } else {
      document.title = "Noti42 - Category Not Found";
    }
  }, [slug]);

  if (loading) {
    document.title = "Noti42 - Loading Category...";
    return <div className="container">Loading articles...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  if (articles.length === 0) {
    document.title = "Noti42 - No Articles Found";
    return <div className="container">No articles found for {categoryName || slug}.</div>;
  }

  const mainArticle = articles.length > 0 ? articles[0] : undefined;
  const otherArticles = articles.slice(1);

  const formattedCategoryName = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category');

  return (
    <div className="main-content">
      <div className="container">
        <h1>{formattedCategoryName}</h1>
        <ArticleGrid articles={otherArticles} featuredArticle={mainArticle} />
      </div>
    </div>
  );
};

export default CategoryView;
