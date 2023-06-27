import React from 'react';
import LoginPage from './components/LoginPage';
import BooksPage from './components/Books/BooksPage';
import LoansPage from './components/Loans/LoansPage';
import MenuPage from './utils/MenuPage';
import Footer from './utils/Footer';
import UsersPage from './components/Users/UsersPage';
import RegisterPage from './components/Users/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksUsersPage from './components/Books/BooksUsersPage';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <MenuPage />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/books" element={<BooksPage />} />
          <Route path="/books" element={<BooksUsersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Add more routes */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
