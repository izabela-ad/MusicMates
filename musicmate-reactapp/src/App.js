import logo from "./logo.svg";
import "./App.css";
//newly added
import React from "react";
//import "./webapp.css";
const CLIENT_ID = "59759643100f409a9ba8dae7ddbb6a19";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
const WebApp = () => {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    // "${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL_AFTER_LOGIN}&response_type=token&show_dialog=true";
  };
  return (
    <div className="container">
      <h1>MusicMate</h1>
      <button onClick={handleLogin}>login into spotify</button>
    </div>
  );
};
export default WebApp;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p>Music Mate</p>
//         {/* <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         > */}
//         <button>Sign in to Spotify</button>
//         {/* </a> */}
//       </header>
//     </div>
//   );
// }

// export default App;
