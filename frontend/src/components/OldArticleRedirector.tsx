import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlugLegacy } from '../api'; // Assuming you have this function for the old slug

const OldArticleRedirector: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      if (slug) {
        try {
          const article = await getArticleBySlugLegacy(slug);
          console.log('Redirecting to new article:', article);
          if (article && article.category && article.slug) {
            navigate(`/${article.category.slug}/${article.slug}`, { replace: true });
          } else {
            // Handle case where article or its category/slug is not found
            navigate('/404', { replace: true }); // Or a more appropriate fallback
          }
        } catch (error) {
          console.error('Error fetching old article for redirection:', error);
          navigate('/404', { replace: true }); // Redirect to 404 on error
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/404', { replace: true }); // No slug provided
      }
    };

    redirect();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/favicon.png" alt="Cargando..." className="loading-logo" />
        <p>Redirigiendo...</p>
      </div>
    );
  }

  return null; // Or a simple message if not redirecting immediately
};

export default OldArticleRedirector;
