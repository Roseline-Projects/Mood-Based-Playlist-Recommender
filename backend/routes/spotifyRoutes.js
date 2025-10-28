// backend/routes/spotifyRoutes.js
import express from "express";
import axios from "axios";
import { getSpotifyToken } from "../utils/spotifyAuth.js";

const router = express.Router();

// Test route to get a new token
router.get("/token", async (req, res) => {
  const token = await getSpotifyToken();
  if (!token) return res.status(500).json({ error: "Failed to retrieve Spotify token" });
  res.json({ access_token: token });
});

// Example route to get playlists by mood
router.get("/playlists", async (req, res) => {
  const mood = req.query.mood || "chill";
  const token = await getSpotifyToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data.playlists.items);
  } catch (error) {
    console.error("❌ Error fetching playlists:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

export default router;
