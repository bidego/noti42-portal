import React from 'react';
import type { Article } from '../api';
import ArticleCard from './ArticleCard';
import './RelatedArticlesFeed.css';

interface RelatedArticlesFeedProps {
  articles: Article[];
  currentArticleSlug: string;
}

const RelatedArticlesFeed: React.FC<RelatedArticlesFeedProps> = ({ articles, currentArticleSlug }) => {
  const filteredArticles = articles.filter(article => article.slug !== currentArticleSlug);

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className="related-articles-feed">
      <h2>Artículos Relacionados</h2>
      <div className="row">
        {filteredArticles.map(article => (
          <div key={article.id} className="col-md-4 mb-4">
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticlesFeed;
