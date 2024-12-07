import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./components/Application";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Application />} />
      </Routes>
    </Router>
  );
}

export default App;
