import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar/Navbar";
// import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
