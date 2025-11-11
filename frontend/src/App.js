import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoodSelectionPage from "./pages/MoodSelectionPage";
import PlaylistPage from "./pages/PlaylistPage";
import logo from './assets/moodifyLogo.png';
import './App.css';


function App() {
  return (
    // YOU MUST HAVE ONE PARENT WRAPPER LIKE THIS:
    <div className="App">

      {/* Your fixed logo */}
      <img src={logo} className="app-logo-fixed" alt="Moodify Logo" />

      {/* Your Router for all the pages */}
      <Router>
        <Routes>
          <Route path="/" element={<MoodSelectionPage />} />
          <Route path="/playlist/:mood" element={<PlaylistPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;