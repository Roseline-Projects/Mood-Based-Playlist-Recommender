import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const searchPlaylistsByMood = async (mood) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spotify/playlists?mood=${mood}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching playlists from backend:", error);
    return [];
  }
};

