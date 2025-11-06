import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Need this to get the mood from the URL
import { searchPlaylistsByMood, getPlaylistTracks } from "../services/spotify"; 

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for track selection and display
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [tracksError, setTracksError] = useState(null);

  // Get 'mood' from the URL parameter (/playlist/chill)
  const { mood } = useParams();


  // ---------------------------------------------
  // Fetch mood playlists
  // ---------------------------------------------
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!mood) return; 

      setLoading(true);
      setError(null);
      setTracks([]); // Reset tracks when mood changes
      setSelectedPlaylist(null); // Reset selection

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


  // ---------------------------------------------
  // Handle playlist click
  // ---------------------------------------------
  const handlePlaylistClick = async (playlistId, playlistName) => {
    setTracksLoading(true);
    setTracksError(null);
    setSelectedPlaylist(playlistName);
    setTracks([]); 

    try {
        // Use the new service function to fetch the tracks
        const tracksData = await getPlaylistTracks(playlistId);
        setTracks(tracksData);
    } catch (err) {
        console.error(`Error fetching tracks for ${playlistName}:`, err);
        setTracksError(`Failed to load tracks for ${playlistName}.`);
    } finally {
        setTracksLoading(false);
    }
  };


  // Render States
  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "3rem" }}><h1>Loading {mood?.toUpperCase()} Playlists...</h1></div>;
  }
  if (error) {
    return <div style={{ textAlign: "center", marginTop: "3rem", color: 'red' }}><h1>Error: {error}</h1></div>;
  }
  if (playlists.length === 0) {
    return (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <h1>No {mood?.toUpperCase()} Playlists Found 😔</h1>
            <p>The Spotify API returned zero results for this mood.</p>
        </div>
    );
  }
  
  // Render Playlists and Track List
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>{mood?.toUpperCase()} Playlists 🎶</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
        {playlists.map((playlist) => {
             // Crucial null/undefined check
             if (!playlist || !playlist.id || !playlist.images || playlist.images.length === 0) {
                 return null;
             }

             return (
                <div 
                    key={playlist.id} 
                    // Make the playlist clickable and call the new handler
                    onClick={() => handlePlaylistClick(playlist.id, playlist.name)}
                    style={{ 
                        width: "200px", 
                        border: "1px solid #ccc", 
                        borderRadius: "8px", 
                        padding: "1rem", 
                        cursor: "pointer", 
                        transition: 'transform 0.2s',
                        boxShadow: selectedPlaylist === playlist.name ? '0 0 10px 3px #1db954' : 'none',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img 
                    src={playlist.images[0].url || 'placeholder.png'} 
                    alt={playlist.name} 
                    style={{ width: "100%", borderRadius: "8px" }} 
                  />
                  <h4>{playlist.name}</h4>
                  {playlist.external_urls?.spotify && (
                    <a 
                      href={playlist.external_urls.spotify} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontSize: '0.8rem', color: '#1db954' }}
                    >
                      Open on Spotify
                    </a>
                  )}
                </div>
             );
        })}
      </div>
      
    
      {selectedPlaylist && (
        <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#222', color: 'white', maxWidth: '800px', margin: '4rem auto', borderRadius: '10px', textAlign: 'left' }}>
          <h2 style={{ textAlign: 'center', color: '#1db954', borderBottom: '1px solid #333', paddingBottom: '15px' }}>Tracks for "{selectedPlaylist}"</h2>
          
          {tracksLoading && <p style={{ textAlign: 'center' }}>Loading tracks...</p>}
          {tracksError && <p style={{ color: 'red', textAlign: 'center' }}>Error: {tracksError}</p>}
          
          {tracks.length > 0 && !tracksLoading && (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {tracks.map((track, index) => (
                <li key={track.id || index} style={{ padding: '10px 0', borderBottom: '1px solid #444' }}>
                  <strong>{index + 1}. {track.name}</strong> - {track.artist} (Album: *{track.album}*)
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