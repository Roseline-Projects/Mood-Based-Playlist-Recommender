import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

export const searchPlaylistsByMood = async (mood) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spotify/playlists?mood=${mood}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching playlists from backend:", error);
    return [];
  }
};

// Fetches tracks for a specific playlist ID
export const getPlaylistTracks = async (playlistId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spotify/playlists/${playlistId}/tracks`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching tracks for playlist ${playlistId}:`, error);
    return [];
  }
};

