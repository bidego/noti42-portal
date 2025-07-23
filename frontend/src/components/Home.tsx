import React, { useState, useEffect } from 'react';
import ArticleGrid from './ArticleGrid';
import { getArticles, type Article } from '../api';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Noti42 - Home";
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/favicon.png" alt="Cargando..." className="loading-logo" />
        <p>Cargando artículos....</p>
      </div>
    );
  }

  const featuredArticles = articles.filter(a => a.featured);
  const heroArticle = featuredArticles.length > 0 ? featuredArticles[0] : undefined;
  const otherFeatured = featuredArticles.slice(1);
  const nonFeatured = articles.filter(a => !a.featured);

  return (
    <ArticleGrid 
      articles={nonFeatured} 
      featuredArticle={heroArticle} 
      secondaryArticles={otherFeatured} 
    />
  );
};

export default Home;