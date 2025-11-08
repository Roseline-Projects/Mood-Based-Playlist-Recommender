import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MoodButton from "../components/MoodButton";
import { moodDictionary } from "./constants";
// import { searchPlaylistsByMood } from "../services/spotify";

const moods = ["Chill", "Focus", "Energetic", "Happy", "Sad"];


function MoodSelectionPage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  const handleMoodClick = async (mood) => {
    console.log("Selected mood:", mood);
    
    // Navigate to the new dynamic URL with the mood
    navigate(`/playlist/${mood.toLowerCase()}`);
  };

  const handleSearchClick = async (e) => {
    console.log(e.target.value)

    const userText = e.target.value;

    // pattern matching
    // create an object for storing matches
    const moodData = {} 
    for (const key of moods) {
      moodData[key.toLowerCase()] = 0;
    }

    // check for matches
    //for each mood, 
      //count the number of dictionary entries that appear in the string
    Object.keys(moodData).forEach(mood => {
      console.log(mood)
      const synonyms = moodDictionary[mood]
      console.log(synonyms)
      synonyms.forEach((word) => {
        if (userText.includes(word))
          moodData[mood] +=1;
      })
    });

    console.log(moodData)

    const overallMood = Object.entries(moodData).reduce(([mood, count], accumulator) => (
      count > accumulator[1] ? [mood, count] : accumulator
    ), ["", -Infinity])

    console.log(overallMood)
    //navigate(`/playlist/${overallMood[0].toLowerCase()}`);
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
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ padding: "1rem 2rem" }}
           />
           <button onClick={handleSearchClick}>Go</button>
        </div>
    </div>
  );
}

export default MoodSelectionPage;