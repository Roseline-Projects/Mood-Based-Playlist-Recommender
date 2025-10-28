import express from "express";
import { getPlaylists, createPlaylist } from "../controllers/playlistController.js";

const router = express.Router();

router.get("/", getPlaylists);
router.post("/", createPlaylist);

export default router;
