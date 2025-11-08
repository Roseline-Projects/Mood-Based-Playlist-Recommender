import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MoodButton from "../components/MoodButton";
import { moodDictionary } from "./constants";
// import { searchPlaylistsByMood } from "../services/spotify";

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
    
    // Navigate to the new dynamic URL with the mood
    navigate(`/playlist/${mood.toLowerCase()}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // pattern matching
    // create frequency table
    const moodData = {} 
    for (const key of moods) {
      moodData[key.toLowerCase()] = 0;
    }

    // check for matches
    // for each mood, 
      // count the number of dictionary entries that appear in the string
    Object.keys(moodData).forEach(mood => {
      const synonyms = moodDictionary[mood]
      synonyms.forEach((word) => {
        if (userInput.includes(word))
          moodData[mood] +=1;
      })
    });

    // find highest count
    const overallMood = Object.entries(moodData).reduce(([mood, count], accumulator) => (
      count > accumulator[1] ? [mood, count] : accumulator
    ), ["", -Infinity])

    console.log(overallMood)

    // make api request and update UI
    setDetectedMood(overallMood[0])
    navigate(`/playlist/${overallMood[0]}`);
  }

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
        <div>
          <form>
            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                placeholder="Type how you feel..."
                value={userInput}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  width: "250px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem"
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                marginLeft: "10px",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#4CAF50",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
              }}>Submit</button>
            </div>
          </form>
          {detectedMood && (
        <p style={{ marginTop: "20px", fontSize: "1.2rem"}}>
          Detected Mood: <strong>{detectedMood}</strong>
        </p>
      )}
        </div>
    </div>
  );
}

export default MoodSelectionPage;