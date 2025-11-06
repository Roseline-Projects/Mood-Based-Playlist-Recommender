//backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/playlists", playlistRoutes);
app.use("/api/spotify", spotifyRoutes);


app.get("/", (req, res) => {
  res.send("Mood Music API is running 🎵");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
