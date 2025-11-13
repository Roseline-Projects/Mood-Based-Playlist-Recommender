// frontend/src/pages/MoodSelectionPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoodButton from "../components/MoodButton"; // This component will be styled by the CSS
import { moodDictionary } from "./constants";
import './MoodSelectionPage.css'; // <-- 1. IMPORT YOUR NEW CSS FILE

const moods = ["Chill", "Focus", "Energetic", "Happy", "Sad"];

function MoodSelectionPage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [detectedMood, setDetectedMood] = useState(null);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleMoodClick = async (mood) => {
    console.log("Selected mood:", mood);
    navigate(`/playlist/${mood.toLowerCase()}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moodData = {};
    for (const key of moods) {
      moodData[key.toLowerCase()] = 0;
    }
    Object.keys(moodData).forEach(mood => {
      const synonyms = moodDictionary[mood];
      synonyms.forEach((word) => {
        if (userInput.includes(word)) moodData[mood] += 1;
      });
    });
    const overallMood = Object.entries(moodData).reduce(
      ([currentMood, currentCount], [mood, count]) => (count > currentCount ? [mood, count] : [currentMood, currentCount]),
      ["chill", 0]
    );

    setDetectedMood(overallMood[0]);
    navigate(`/playlist/${overallMood[0]}`);
  };

  return (
    // 2. Use classNames instead of inline styles
    <div className="mood-selection-container">
      <h2 className="mood-title">🎶 Choose Your Mood 🎶</h2>
      <div className="mood-buttons-grid">
        {moods.map((mood) => (
          // The CSS will style the <button> element inside your MoodButton component
          <MoodButton key={mood} label={mood} onClick={handleMoodClick} />
        ))}
      </div>
      <div>
        <form className="mood-form" onSubmit={handleSubmit}>
          <div className="mood-input-section">
            <input
              type="text"
              placeholder="What mood are you in?"
              value={userInput}
              onChange={handleChange}
              className="mood-text-input" // 3. Replaced inline style
            />
            <button
              type="submit" // 4. Use type="submit" for forms
              className="suggest-playlist-button" // 5. This class fixes the green button
            >
              Submit
            </button>
          </div>
        </form>
        {detectedMood && (
          <p className="detected-mood">
            Detected Mood: <strong>{detectedMood}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default MoodSelectionPage;