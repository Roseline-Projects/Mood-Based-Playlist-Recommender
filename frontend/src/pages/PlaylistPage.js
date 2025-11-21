// frontend/src/pages/PlaylistPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPlaylistsByMood, getPlaylistTracks } from "../services/spotify";
import './PlaylistPage.css'; // import new css file

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [tracksError, setTracksError] = useState(null);

  const { mood } = useParams();

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!mood) return;
      setLoading(true);
      setError(null);
      setTracks([]);
      setSelectedPlaylist(null);
      try {
        const data = await searchPlaylistsByMood(mood);
        setPlaylists(data);
      } catch (err) {
        console.error("Error fetching playlists:", err);
        setError("Failed to load playlists. Check backend console for API error.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, [mood]);

  const handlePlaylistClick = async (playlistId, playlistName) => {
    setTracksLoading(true);
    setTracksError(null);
    setSelectedPlaylist(playlistName);
    setTracks([]);
    try {
      const tracksData = await getPlaylistTracks(playlistId);
      setTracks(tracksData);
    } catch (err) {
      console.error(`Error fetching tracks for ${playlistName}:`, err);
      setTracksError(`Failed to load tracks for ${playlistName}.`);
    } finally {
      setTracksLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-message"><h1>Loading {mood?.toUpperCase()} Playlists...</h1></div>;
  }
  if (error) {
    return <div className="error-message"><h1>Error: {error}</h1></div>;
  }
  if (playlists.length === 0) {
    return (
      <div className="no-results-message">
        <h1>No {mood?.toUpperCase()} Playlists Found 😔</h1>
        <p>The Spotify API returned zero results for this mood.</p>
      </div>
    );
  }

  return (
    // classNames for all styling
    <div className="playlist-page-container">
      <h1 className="playlist-page-title">{mood?.toUpperCase()} Playlists 🎶</h1>
      <div className="playlist-grid">
        {playlists.map((playlist) => {
          if (!playlist || !playlist.id || !playlist.images || playlist.images.length === 0) {
            return null;
          }
          // classes to handle selection instead of inline shadow
          const isSelected = selectedPlaylist === playlist.name;

          return (
            <div
              key={playlist.id}
              onClick={() => handlePlaylistClick(playlist.id, playlist.name)}
              className={isSelected ? 'playlist-card selected' : 'playlist-card'}
            >
              <img
                src={playlist.images[0].url || 'placeholder.png'}
                alt={playlist.name}
                className="playlist-image"
              />
              <h4 className="playlist-name">{playlist.name}</h4>
              {playlist.external_urls?.spotify && (
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="spotify-link"
                >
                  Open on Spotify
                </a>
              )}
            </div>
          );
        })}
      </div>

      {selectedPlaylist && (
        <div className="tracks-section">
          <h2 className="tracks-title">Tracks for "{selectedPlaylist}"</h2>

          {tracksLoading && <p className="tracks-loading">Loading tracks...</p>}
          {tracksError && <p className="tracks-error">Error: {tracksError}</p>}

          {tracks.length > 0 && !tracksLoading && (
            <ul className="tracks-list">
              {tracks.map((track, index) => (
                <li key={track.id || index} className="track-item">
                  <strong>{index + 1}. {track.name}</strong> - {track.artist} (Album: <em>{track.album}</em>)
                </li>
              ))}
            </ul>
          )}

          {tracks.length === 0 && !tracksLoading && !tracksError && <p style={{ textAlign: 'center' }}>No tracks found for this playlist.</p>}
        </div>
      )}
    </div>
  );
}

export default PlaylistPage;