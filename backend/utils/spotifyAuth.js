// backend/utils/spotifyAuth.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let spotifyToken = null;
let tokenExpirationTime = null;

export async function getSpotifyToken() {
  // If token is still valid, return it
  if (spotifyToken && Date.now() < tokenExpirationTime) {
    return spotifyToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    spotifyToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000; // store expiration time

    console.log("✅ Spotify token retrieved successfully");
    return spotifyToken;
  } catch (error) {
    console.error("❌ Error retrieving Spotify token:", error.response?.data || error.message);
    return null;
  }
}

