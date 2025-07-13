import { useState } from 'react';
import type { Article } from '../api';
import ArticleCard from './ArticleCard';
import './ArticleGrid.css';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(articles.map(article => article.category.name))];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category.name === selectedCategory);
  
  const featuredArticle = articles.find(article => article.featured);
  const secondaryArticles = articles.filter(article => !article.featured).slice(0, 4);

  return (
    <div className="container-fluid">
      {/* Featured Section */}
      {featuredArticle && (
        <section className="featured-section">
          <div className="featured-main">
            <ArticleCard {...featuredArticle} variant="featured" />
          </div>
          <div className="featured-sidebar">
            <h2 className="sidebar-title">Destacadas</h2>
            <div className="secondary-articles">
              {secondaryArticles.map((article) => (
                <ArticleCard key={article.id} {...article} variant="secondary" />
              ))}
            </div>
          </div>
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
        <h2 className="section-title">Últimas Noticias</h2>
        <div className="articles-grid">
          {filteredArticles.filter(article => !article.featured).map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleGrid;
