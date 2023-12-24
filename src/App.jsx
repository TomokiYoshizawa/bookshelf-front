// import React from "react";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookCard from "./components/BookCard/BookCard";
import { SearchProvider } from "./contexts/SearchContext/SearchContext";

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <div className="app">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<BookCard />} />
          </Routes>
        </div>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
