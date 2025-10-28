import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  spotifyId: {
    type: String,
    required: true,
  },
  tracks: [
    {
      name: String,
      artist: String,
      url: String,
    },
  ],
});

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
