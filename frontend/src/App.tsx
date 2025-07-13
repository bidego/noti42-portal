import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import ArticleView from './components/ArticleView';
import CategoryView from './components/CategoryView';
import Header from './components/Header';
import Footer from './components/Footer';
import { getCategories, type Category } from './api';
import './App.css';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header categories={categories} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/slug/:slug" element={<ArticleView />} />
            <Route path="/categories/:slug" element={<CategoryView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;