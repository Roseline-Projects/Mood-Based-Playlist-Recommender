import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MoodButton from "../components/MoodButton";
// import { searchPlaylistsByMood } from "../services/spotify";

const moods = ["Chill", "Focus", "Energetic", "Happy", "Sad"];

function MoodSelectionPage() {
  const navigate = useNavigate();

  const handleMoodClick = async (mood) => {
    console.log("Selected mood:", mood);
    
    // Navigate to the new dynamic URL with the mood
    navigate(`/playlist/${mood.toLowerCase()}`);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>🎶 Choose Your Mood 🎶</h2>
      <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem"
        }}>
        {moods.map((mood) => (
          <MoodButton key={mood} label={mood} onClick={handleMoodClick} />
        ))}
      </div>
    </div>
  );
}

export default MoodSelectionPage;