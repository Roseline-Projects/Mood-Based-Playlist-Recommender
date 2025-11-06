// spotifyRoutes.js
import express from "express";
import axios from "axios";
import { getSpotifyToken } from "../utils/spotifyAuth.js";

const router = express.Router();

// GET /spotify/token
// Returns a fresh Spotify API token
router.get("/token", async (req, res) => {
  const token = await getSpotifyToken();
  if (!token) {
    return res.status(500).json({ error: "Failed to retrieve Spotify token" });
  }
  res.json({ access_token: token });
});

// GET /spotify/playlists?mood=chill
// Returns exactly 5 playlists matching the given mood.
router.get("/playlists", async (req, res) => {
  const mood = req.query.mood || "chill";
  const token = await getSpotifyToken();

  if (!token) {
    return res
      .status(503)
      .json({ error: "Spotify service unavailable. Could not retrieve API token." });
  }

  try {
    const searchUrl = "https://api.spotify.com/v1/search";
    
    const enhancedQuery = `${mood} music`;
    const query = `q=${encodeURIComponent(enhancedQuery)}&type=playlist&limit=20`;

    const response = await axios.get(`${searchUrl}?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Filter valid playlists only
    let playlists = response.data.playlists.items.filter(
      (p) => p && p.id && p.name && p.images?.length > 0
    );

    // Shuffle and select exactly 5
    playlists = playlists.sort(() => Math.random() - 0.5).slice(0, 5);

    res.json(playlists.slice(0, 5));
  } catch (error) {
    console.error(
      "Error fetching playlists from Spotify:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch playlists from Spotify" });
  }
});

// GET /spotify/playlists/:id/tracks
// Returns tracks for a given playlist (up to 10 per playlist)
router.get("/playlists/:id/tracks", async (req, res) => {
  const playlistId = req.params.id;
  const token = await getSpotifyToken();

  if (!token) {
    return res
      .status(503)
      .json({ error: "Spotify service unavailable. Could not retrieve API token." });
  }

  try {
    const tracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const response = await axios.get(`${tracksUrl}?limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Format tracks cleanly
    const tracks = response.data.items
      .map((item) => ({
        id: item.track?.id,
        name: item.track?.name,
        artist: item.track?.artists?.[0]?.name,
        album: item.track?.album?.name,
        preview_url: item.track?.preview_url,
      }))
      .filter((track) => track.id && track.name);

    res.json(tracks);
  } catch (error) {
    console.error(
      "Error fetching playlist tracks:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch playlist tracks from Spotify" });
  }
});

export default router;