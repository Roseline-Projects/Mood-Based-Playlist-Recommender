import React from "react";
import MoodButton from "../components/MoodButton";
import { searchPlaylistsByMood } from "../services/spotify";

const moods = ["Chill", "Focus", "Energetic", "Happy", "Sad"];

function MoodSelectionPage() {
  const handleMoodClick = async (mood) => {
    console.log("Selected mood:", mood);
    const playlists = await searchPlaylistsByMood(mood);
    console.log("Spotify Playlists:", playlists);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>🎶 Choose Your Mood 🎶</h2>
      <div>
        {moods.map((mood) => (
          <MoodButton key={mood} label={mood} onClick={handleMoodClick} />
        ))}
      </div>
    </div>
  );
}

export default MoodSelectionPage;
