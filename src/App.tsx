import React from 'react';
import LoginPage from './components/LoginPage';
import BooksPage from './components/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/books" element={<BooksPage />} />
        {/* Dodaj inne trasy */}
      </Routes>
    </Router>
  );
};

export default App;