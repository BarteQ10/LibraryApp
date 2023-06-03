import React from 'react';
import LoginPage from './components/LoginPage';
import BooksPage from './components/BooksPage';
import LoansPage from './components/LoansPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loans" element={<LoansPage />} />
        {/* Dodaj inne trasy */}
      </Routes>
    </Router>
  );
};

export default App;