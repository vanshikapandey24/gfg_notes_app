// App.js — CORRECT VERSION (NO <Router> HERE)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import {Archive} from './pages/Archive';
import Important from './pages/Important';
import Bin from './pages/Bin';


const App = () => {
  return (
    <div className="flex h-screen">
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/important" element={<Important />} />
          <Route path="/Bin" element={<Bin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
