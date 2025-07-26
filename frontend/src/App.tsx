import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import ArticleView from './components/ArticleView';
import CategoryView from './components/CategoryView';
import OldArticleRedirector from './components/OldArticleRedirector';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import ContactForm from './components/ContactForm';
import AdvertisementForm from './components/AdvertisementForm';
import { getCategories, type Category } from './api';
import { sendPageView } from './analytics';
import './App.css';

// Componente para rastrear las vistas de página
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    sendPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bffVersion, setBffVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    const fetchBffVersion = async () => {
      try {
        const response = await fetch('/version'); // Assuming /version is relative to the frontend
        if (response.ok) {
          const data = await response.json();
          setBffVersion(data.version);
        }
      } catch (error) {
        console.error('Error fetching BFF version:', error);
      }
    };

    fetchData();
    fetchBffVersion();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <PageViewTracker />
      <div className="App">
        <Header categories={categories} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/slug/:slug" element={<OldArticleRedirector />} />
            <Route path="/:categorySlug/:articleSlug" element={<ArticleView />} />
            <Route path="/noticias/:categorySlug/:articleSlug" element={<ArticleView />} />
            <Route path="/:slug" element={<CategoryView />} />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/privacidad" element={<PrivacyPolicy />} />
            <Route path="/terminos" element={<TermsAndConditions />} />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/publicidad" element={<AdvertisementForm />} />
          </Routes>
        </main>
        <Footer />
        {import.meta.env.VITE_APP_VERSION && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '0px',
            fontSize: '0.7em',
            color: '#ccc',
            zIndex: 1000,
            paddingRight: '5px' // Add a small padding to prevent it from touching the very edge
          }}>
            f-v{import.meta.env.VITE_APP_VERSION}
          </div>
        )}
        {bffVersion && (
          <div style={{
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            fontSize: '0.7em',
            color: '#ccc',
            zIndex: 1000,
            paddingRight: '5px' // Add a small padding to prevent it from touching the very edge
          }}>
            bff-v{bffVersion}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
