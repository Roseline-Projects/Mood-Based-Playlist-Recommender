import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoodSelectionPage from "./pages/MoodSelectionPage";
import PlaylistPage from "./pages/PlaylistPage";
import logo from './assets/moodifyLogo.png';
import './App.css';


function App() {
  return (
    // Parent wrapper:
    <div className="App">

      {/* Logo wrapped in an anchor tag to navigate to the home page */}
      <a href="/">
        <img src={logo} className="app-logo-fixed" alt="Moodify Logo" />
      </a>

      {/*Router for all the pages */}
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