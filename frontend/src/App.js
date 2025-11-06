import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoodSelectionPage from "./pages/MoodSelectionPage";
import PlaylistPage from "./pages/PlaylistPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoodSelectionPage />} />
        <Route path="/playlist/:mood" element={<PlaylistPage />} />
      </Routes>
    </Router>
  );
}

export default App;