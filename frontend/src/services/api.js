import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // Express backend
});

export const getPlaylists = () => API.get("/playlists");
export const createPlaylist = (playlistData) => API.post("/playlists", playlistData);