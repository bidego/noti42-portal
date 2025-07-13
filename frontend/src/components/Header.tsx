import { useState } from 'react';
import { type Category } from '../api';
import './Header.css';

interface HeaderProps {
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="breaking-news">
        <div className="container-fluid">
          <span>🔴 ÚLTIMO MOMENTO: Sigue las noticias más importantes en tiempo real</span>
        </div>
      </div>
      
      <header className="main-header">
        <div className="container-fluid">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="logo">
                <span className="logo-main">Noti</span>
                <span className="logo-accent">42</span>
              </h1>
              <p className="tagline">Noticias en tiempo real</p>
            </div>
            
            <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-links">
                <li><a href="#home" className="nav-link active">Inicio</a></li>
                {categories.map(category => (
                  <li key={category.id}><a href={`#${category.name.toLowerCase()}`} className="nav-link">{category.name}</a></li>
                ))}
              </ul>
            </nav>
            
            <div className="header-actions">
              <button className="search-btn" aria-label="Buscar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="21 21l-4.35-4.35"/>
                </svg>
              </button>
              
              <button 
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Menú"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
