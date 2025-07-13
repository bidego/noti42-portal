import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ArticleView from './components/ArticleView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<ArticleView />} />
      </Routes>
    </Router>
  );
}

export default App;
