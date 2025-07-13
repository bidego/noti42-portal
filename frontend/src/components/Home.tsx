import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeroArticle from './HeroArticle';
import ArticleGrid from './ArticleGrid';
import Footer from './Footer';
import { getCategories, getArticles, type Category, type Article } from '../api';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);

      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    };

    fetchData();
  }, []);

  const heroArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="App">
      <Header categories={categories} />
      <main className="main-content">
        {heroArticle && (
          <HeroArticle article={heroArticle} />
        )}
        <ArticleGrid articles={articles} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
