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

  // Send credentials and grant type in the body
  const bodyParams = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const response = await axios.post(
      tokenUrl,
      // The second argument is the HTTP Body, formatted as URLSearchParams
      new URLSearchParams(bodyParams),
      {
        headers: {
          // Authentication method
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    spotifyToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000;

    console.log("Spotify token retrieved successfully");
    return spotifyToken;
  } catch (error) {
    console.error("Error retrieving Spotify token:", error.response?.data || error.message);
    if (error.response?.status === 400 || error.response?.status === 401) {
        console.error("-> Authentication failed. Check your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your backend .env file.");
    }
    return null;
  }
}