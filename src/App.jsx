// import React from "react";
import "./App.scss";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Bookshelf />
    </div>
  );
}

export default App;
