import React from 'react';
import LoginPage from './components/LoginPage';
import BooksPage from './components/BooksPage';
import LoansPage from './components/LoansPage';
import MenuPage from './components/MenuPage';
//import ProfilePage from './components/ProfilePage';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
    <MenuPage/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loans" element={<LoansPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* Add more routes */}
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;