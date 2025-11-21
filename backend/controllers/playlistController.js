import Playlist from "../models/playlistModel.js";

// GET all playlists
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post create new playlist
export const createPlaylist = async (req, res) => {
  const { mood, name, spotifyId, tracks } = req.body;
  try {
    const newPlaylist = new Playlist({ mood, name, spotifyId, tracks });
    const saved = await newPlaylist.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
