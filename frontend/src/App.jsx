// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from './layers/Application';
import Lawyer from './layers/Lawyer';
import Case from "./layers/Case";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/basvurular" element={<Application />} />
        <Route path="/avukatlar" element={<Lawyer />} />
        <Route path="/davalar" element={<Case />} />
        <Route path="/medya-taramasi" element={<Lawyer />} />
        <Route path="/stk-verileri" element={<Lawyer />} />
        <Route path="/baro-komisyonlari" element={<Lawyer />} />
        <Route path="/kamu-kurumlari" element={<Lawyer />} />
        {/* Diğer rotalar */}
      </Routes>
    </Router>
  );
};

export default App;
