import logo from "./logo.svg";
import "./App.css";
//newly added
import React, { useEffect } from "react";
//import "./webapp.css";

/*
url after redirect login
http://localhost:3000/#access_token=BQCI5nH4zRAWJtOXGmLMnZtgIWoScWSwSYz_eFgolhJWLk8ySVeAyRcYXmhTGpjmBfVZflUz03EghfZgIXGE7gooqqFNEafSmuTLlOXoz9I3Hhg-Bnr-dGqTnLeYHkvv3gAtX3ID8fTczNOTODYaiNR6vWG8JbvLPGg86g7YDMIIpYzHporNw4hMOuDn9LsFGw&token_type=Bearer&expires_in=3600

*/
// var request = require("request"); // "Request" library

var client_id = ""; // Your client id
var client_secret = ""; // Your secret
// document.querySelector("#search").addEventListener("click", getArtist);
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
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
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

const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  console.log(data.access_token);
  return data.access_token;
};
getToken();

const getArtist = async (token) => {
  const name = document.querySelector("#artistName").value;
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${name}&type=artist`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  console.log(data);
  return data;
};
const token = await getToken();
getArtist(token);

// var authOptions = {
//   url: "https://accounts.spotify.com/api/token",
//   headers: {
//     Authorization:
//       "Basic " +
//       new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//   },
//   form: {
//     grant_type: "client_credentials",
//   },
//   json: true,
// };
// function getArtist() {
//   const name = document.querySelector("#artistName").value;
//   request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       // use the access token to access the Spotify Web API
//       var token = body.access_token;
//       var options = {
//         url: `https://api.spotify.com/v1/search?q=${name}&type=artist`,
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//         json: true,
//       };
//       request.get(options, function (error, response, body) {
//         console.log(body);
//         // photo = body.artists.items[0].images[2];
//         document.querySelector(".artistBox").innerHTML = "";
//         for (let i = 0; i < body.artists.items.length; i++) {
//           // console.log(i + " " + body.artists.items[i].name);
//           if (body.artists.items[i].images.length !== 0) {
//             document.querySelector(".artistBox").innerHTML += `
//         <div>
//         <img src="${body.artists.items[i].images[2].url}" alt=${body.artists.items[0].name} />
//       </div>
//       <div class="artistInfo">
//         <h1>${body.artists.items[i].name}</h1>
//         <p>${body.artists.items[i].genres}</p>
//       </div>
//         `;
//           } else {
//             document.querySelector(".artistBox").innerHTML += `
//         <div>
//         <img src="" alt=${body.artists.items[0].name} />
//       </div>
//       <div class="artistInfo">
//         <h1>${body.artists.items[i].name}</h1>
//         <p>${body.artists.items[i].genres}</p>
//       </div>
//         `;
//           }
//         }
//       });
//     }
//   });
// }
// request.post(authOptions, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: `https://api.spotify.com/v1/me`,
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       json: true,
//     };
//     request.get(options, function (error, response, body) {
//       console.log(body);
//     });
//   }
// });

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
