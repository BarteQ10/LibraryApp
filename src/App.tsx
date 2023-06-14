import React from 'react';
import LoginPage from './components/LoginPage';
import BooksPage from './components/Books/BooksPage';
import LoansPage from './components/Loans/LoansPage';
import MenuPage from './utils/MenuPage';
import Footer from './utils/Footer';
import UsersPage from './components/UsersPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <MenuPage />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/users" element={<UsersPage />} />
          {/* Add more routes */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
