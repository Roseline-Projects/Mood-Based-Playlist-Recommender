# 🎧 Moodify

Moodify is a web app that recommends Spotify playlists based on your mood.

## 🧠 Overview

The project has two main parts:
- **Frontend:** Built with React 
- **Backend:** Node.js + Express server that connects to the Spotify API

---

## Frontend

### **The main components here are the following:**
**src:**
- **assets:**
    * moodifyLogo.png: ***The Moodify logo for the frontend to use***
- **Component:**
    * MoodButton.js: ***It grabs and reads the label from a button that user clicks on***
- **pages:**
    * MoodSelectionPage.js: ***The main page that the user lands on first to either select or type their mood***
    * PlaylistPage.js: ***The page that loads a list of playlists based on the mood navigated/selected***
- **services:**
    * api.js: ***The main integration between backend and frontend logic***
    * Spotify.js: ***Uses the connection to the backend to retrieve playlist informations based on searches of mood***
- **App.js:** ***The main react page that routes to MoodSelectionPage.js***

## Backend
- **config:**
    * db.js: ***Uses MongoDB token and sets up connection to Database***
- **controllers**
    * playlistController.js: ***Sets up html Request Methods; in this case GET and POST for playlists***
- **models**
    * playlistModel.js: ***The model of playlist objects including attributes and its types that will be retrieved from database***
- **routes**
    * playlistRoutes.js: ***The backend route for retrieving informtion of playlists found in Spotify***
    * spotifyRoutes.js: ***The backend route for using Spotify API with our token***
- **utils**
    * spotifyAuth.js: ***Uses Spotify token to connect and use Spotify API***

- **server.js**: ***Connects to MongoDB database and adds backend routes for the app to use***



    

