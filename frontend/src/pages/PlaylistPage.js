import React, { useEffect, useState } from "react";
import axios from "axios";

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const mood = new URLSearchParams(window.location.search).get("mood");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await axios.get(`http://localhost:5000/api/spotify/playlists?mood=${mood}`);
      setPlaylists(response.data);
    };
    fetchPlaylists();
  }, [mood]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>{mood?.toUpperCase()} Playlists 🎶</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
        {playlists.map((playlist) => (
          <div key={playlist.id} style={{ width: "200px", border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
            <img src={playlist.images[0]?.url} alt={playlist.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h4>{playlist.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
