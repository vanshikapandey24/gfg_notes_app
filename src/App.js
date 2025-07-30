// App.js — CORRECT VERSION (NO <Router> HERE)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import {Archive} from './pages/Archive';


const App = () => {
  return (
    <div className="flex h-screen">
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
