import logo from "./logo.svg";
import "./App.css";
//newly added
import React, { useEffect } from "react";
//import "./webapp.css";

/*
url after redirect login
http://localhost:3000/#access_token=BQCI5nH4zRAWJtOXGmLMnZtgIWoScWSwSYz_eFgolhJWLk8ySVeAyRcYXmhTGpjmBfVZflUz03EghfZgIXGE7gooqqFNEafSmuTLlOXoz9I3Hhg-Bnr-dGqTnLeYHkvv3gAtX3ID8fTczNOTODYaiNR6vWG8JbvLPGg86g7YDMIIpYzHporNw4hMOuDn9LsFGw&token_type=Bearer&expires_in=3600

*/
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

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};
const WebApp = () => {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });
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
