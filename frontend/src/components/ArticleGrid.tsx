import { useState } from 'react';
import type { Article } from '../api';
import ArticleCard from './ArticleCard';
import './ArticleGrid.css';

interface ArticleGridProps {
  articles: Article[];
  featuredArticle?: Article; // Optional featured article
  secondaryArticles?: Article[]; // Optional secondary articles
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, featuredArticle, secondaryArticles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(articles.map(article => article.category.name))];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category.name === selectedCategory);
  
  return (
    <div className="container-fluid">
      {/* Featured Section (only if featuredArticle is provided) */}
      {featuredArticle && (
        <section className="featured-section">
          <div className="featured-main">
            <ArticleCard {...featuredArticle} variant="featured" />
          </div>
          {secondaryArticles && secondaryArticles.length > 0 && (
            <div className="featured-sidebar">
              <h2 className="sidebar-title">Destacadas</h2>
              <div className="secondary-articles">
                {secondaryArticles.map((article) => (
                  <ArticleCard key={article.id} {...article} variant="secondary" />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
      
      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((categoryName) => (
          <button
            key={categoryName}
            className={`category-btn ${selectedCategory === categoryName ? 'active' : ''}`}
            onClick={() => setSelectedCategory(categoryName)}
          >
            {categoryName === 'all' ? 'Todas' : categoryName}
          </button>
        ))}
      </div>
      
      {/* Main Articles Grid */}
      <section className="articles-section">
        <h2 className="section-title">Artículos</h2>
        <div className="articles-grid">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleGrid;
