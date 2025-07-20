import React, { useState, useEffect } from 'react';
import HeroArticle from './HeroArticle';
import ArticleGrid from './ArticleGrid';
import { getArticles, type Article } from '../api';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    document.title = "Noti42 - Home";
    const fetchData = async () => {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    };

    fetchData();
  }, []);

  const featuredArticles = articles.filter(a => a.featured);
  const heroArticle = featuredArticles.length > 0 ? featuredArticles[0] : null;
  const otherFeatured = featuredArticles.slice(1);
  const nonFeatured = articles.filter(a => !a.featured);

  return (
    <>
      {heroArticle && (
        <HeroArticle article={heroArticle} />
      )}
      <ArticleGrid articles={otherFeatured.concat(nonFeatured)} />
    </>
  );
};

export default Home;