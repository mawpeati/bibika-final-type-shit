import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CategoryListings from './pages/CategoryListings';
import ListingDetail from './pages/ListingDetail';





const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categorylisting" element={<CategoryListings />} />
      <Route path="/listingdetail" element={<ListingDetail />} />

      </Routes>
    </Router>
  );
};

export default App;
