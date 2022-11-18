import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
//newly added
import React, { useEffect } from "react";
import { Buffer } from "buffer";
//import "./webapp.css";

/*
url after redirect login
http://localhost:3000/#access_token=BQCI5nH4zRAWJtOXGmLMnZtgIWoScWSwSYz_eFgolhJWLk8ySVeAyRcYXmhTGpjmBfVZflUz03EghfZgIXGE7gooqqFNEafSmuTLlOXoz9I3Hhg-Bnr-dGqTnLeYHkvv3gAtX3ID8fTczNOTODYaiNR6vWG8JbvLPGg86g7YDMIIpYzHporNw4hMOuDn9LsFGw&token_type=Bearer&expires_in=3600

*/
// var request = require("request"); // "Request" library
// const CLIENT_ID = "59759643100f409a9ba8dae7ddbb6a19";
var client_secret = "4dac1536390440628fc6c8cb9057c1e8"; // Your secret
var CLIENT_ID = "1d749561a8d143a996cf153f2f3ed2b2"; // Your client id

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
      {/* <h1>MusicMate</h1> */}

      {/* <img src={require("./musicmate.jpg")} /> */}
      <button onClick={handleLogin}>Login into Spotify</button>
    </div>
  );
};
export default WebApp;
// const APIController = (function () {
const getToken = async () => {
  // var responseClone; // 1
  // fetch("https://accounts.spotify.com/api/token", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Authorization:
  //       "Basic " +
  //       new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  //   },
  //   body: "grant_type=client_credentials",
  // })
  //   .then(function (response) {
  //     responseClone = response.clone(); // 2
  //     console.log(response.json());
  //     return response.json();
  //   })
  //   .then(
  //     function (data) {
  //       // Do something with data
  //     },
  //     function (rejectionReason) {
  //       // 3
  //       console.log(
  //         "Error parsing JSON from response:",
  //         rejectionReason,
  //         responseClone
  //       ); // 4
  //       responseClone
  //         .text() // 5
  //         .then(function (bodyText) {
  //           console.log(
  //             "Received the following instead of valid JSON:",
  //             bodyText
  //           ); // 6
  //         });
  //     }
  //   );
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + client_secret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const data = await result.json();
  console.log(data.access_token);
  return data.access_token;
};

const getArtist = async (token) => {
  const name = document.querySelector("#artistName").value;
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${name}&type=artist`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  if (result.ok && result.status === 200) {
    const data = await result.json();
    console.log(data);
    document.querySelector(".artistBox").innerHTML = "";
    for (let i = 0; i < data.artists.items.length; i++) {
      // console.log(i + " " + data.artists.items[i].name);
      if (data.artists.items[i].images.length !== 0) {
        document.querySelector(".artistBox").innerHTML += `
          <div>
          <img src="${data.artists.items[i].images[2].url}" alt=${data.artists.items[0].name} />
        </div>
        <div class="artistInfo">
          <h1>${data.artists.items[i].name}</h1>
          <p>${data.artists.items[i].genres}</p>
        </div>
          `;
      } else {
        document.querySelector(".artistBox").innerHTML += `
          <div>
          <img src="" alt=${data.artists.items[0].name} />
        </div>
        <div class="artistInfo">
          <h1>${data.artists.items[i].name}</h1>
          <p>${data.artists.items[i].genres}</p>
        </div>
          `;
      }
    }
  }

  // console.log(data);
  // return data;
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
  // };
};
// getArtist(getToken());
// document.querySelector("#search").addEventListener("click", getArtist);

const loadData = async () => {
  //get the token
  const token = await getToken();
  //get the genres
  const artist = await getArtist(token);
  //populate our genres select element
  // genres.forEach((element) => UICtrl.createGenre(element.name, element.id));
};
document.querySelector("#search").addEventListener("click", loadData);

// })();
// APIController.init();
// const token = await getToken();
// getArtist(token);

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Music Mate</p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > */}
        <button>Sign in to Spotify</button>
        {/* </a> */}
      </header>
    </div>
  );
}

// export default App;
