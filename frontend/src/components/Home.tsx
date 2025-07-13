import React, { useState, useEffect } from 'react';
import HeroArticle from './HeroArticle';
import ArticleGrid from './ArticleGrid';
import { getArticles, type Article } from '../api';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    };

    fetchData();
  }, []);

  const heroArticle = articles.length > 0 ? articles[0] : null;

  return (
    <>
      {heroArticle && (
        <HeroArticle article={heroArticle} />
      )}
      <ArticleGrid articles={articles} />
    </>
  );
};

export default Home;