import {
  BrowserRouter as Router,
  Routes,
  Route,
  renderMatches,
  Navigate,
} from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
//newly added
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Login from "./Login";
import APICalls from "./APICalls";
//import "./webapp.css";

/*
url after redirect login
http://localhost:3000/#access_token=BQCI5nH4zRAWJtOXGmLMnZtgIWoScWSwSYz_eFgolhJWLk8ySVeAyRcYXmhTGpjmBfVZflUz03EghfZgIXGE7gooqqFNEafSmuTLlOXoz9I3Hhg-Bnr-dGqTnLeYHkvv3gAtX3ID8fTczNOTODYaiNR6vWG8JbvLPGg86g7YDMIIpYzHporNw4hMOuDn9LsFGw&token_type=Bearer&expires_in=3600

*/
// var request = require("request"); // "Request" library
// const CLIENT_ID = "59759643100f409a9ba8dae7ddbb6a19";
// var client_secret = "4bee38dffab14a208a96c957724778e0"; // Your secret
// var CLIENT_ID = "1d749561a8d143a996cf153f2f3ed2b2"; // Your client id

// const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
// const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
// const SPACE_DELIMITER = "%20";
// const SCOPES = [
//   "user-read-currently-playing",
//   "user-read-playback-state",
//   "playlist-read-private",
//   "user-top-read",
// ];
// const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

// const getReturnedParamsFromSpotifyAuth = (hash) => {
//   const stringAfterHashtag = hash.substring(1);
//   const paramsInUrl = stringAfterHashtag.split("&");
//   const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
//     console.log(currentValue);
//     const [key, value] = currentValue.split("=");
//     accumulater[key] = value;
//     return accumulater;
//   }, {});

//   return paramsSplitUp;
// };
// // request.post(authOptions, function (error, response, body) {
// //   if (!error && response.statusCode === 200) {
// //     // use the access token to access the Spotify Web API
// //     var token = body.access_token;
// //     var options = {
// //       url: `https://api.spotify.com/v1/me`,
// //       headers: {
// //         Authorization: "Bearer " + token,
// //       },
// //       json: true,
// //     };
// //     request.get(options, function (error, response, body) {
// //       console.log(body);
// //     });
// //   }
// // });

// const WebApp = () => {
//   useEffect(() => {
//     if (window.location.hash) {
//       const { access_token, expires_in, token_type } =
//         getReturnedParamsFromSpotifyAuth(window.location.hash);
//       localStorage.clear();

//       localStorage.setItem("accessToken", access_token);
//       localStorage.setItem("tokenType", token_type);
//       localStorage.setItem("expiresIn", expires_in);
//     }
//   });
//   const handleLogin = () => {
//     window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
//     // "${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL_AFTER_LOGIN}&response_type=token&show_dialog=true";
//   };
//   return (
//     <div className="container">
//       {/* <h1>MusicMate</h1> */}
//       <Login />

//       {/* <img src={require("./musicmate.jpg")} /> */}
//       <button onClick={handleLogin}>Login into Spotify</button>
//     </div>
//   );
// };

// export default WebApp;
// const APIController = (function () {
// const getToken = async () => {
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
//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " +
//         new Buffer.from(CLIENT_ID + ":" + client_secret).toString("base64"),
//     },
//     body: "grant_type=client_credentials",
//   });
//   const data = await result.json();
//   console.log(data.access_token);
//   return data.access_token;
// };

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
// const getArtist = async (token) => {
//   const name = document.querySelector("#artistName").value;
//   const result = await fetch(
//     `https://api.spotify.com/v1/search?q=${name}&type=artist`,
//     {
//       method: "GET",
//       headers: { Authorization: "Bearer " + token },
//     }
//   );
//   if (result.ok && result.status === 200) {
//     const data = await result.json();
//     console.log(data);

//     document.querySelector(".artistBox").innerHTML = "";
//     for (let i = 0; i < data.artists.items.length; i++) {
//       // console.log(i + " " + data.artists.items[i].name);

//       if (data.artists.items[i].images.length !== 0) {
//         document.querySelector(".artistBox").innerHTML += `
//             <div>
//             <img src="${data.artists.items[i].images[0].url}" alt=${data.artists.items[0].name} />
//           </div>
//           <div class="artistInfo">
//             <h1>${data.artists.items[i].name}</h1>
//             <p>${data.artists.items[i].genres}</p>
//           </div>
//             `;
//       } else {
//         document.querySelector(".artistBox").innerHTML += `
//             <div>
//             <img src="" alt=${data.artists.items[0].name} />
//           </div>
//           <div class="artistInfo">
//             <h1>${data.artists.items[i].name}</h1>
//             <p>${data.artists.items[i].genres}</p>
//           </div>
//             `;
//       }
//     }
//   }
// };
// // getArtist(getToken());
// // document.querySelector("#search").addEventListener("click", getArtist);

// const meData = async (token) => {
//   const result = await fetch("https://api.spotify.com/v1/me", {
//     method: "GET",
//     headers: { Authorization: "Bearer " + token },
//   });
//   const data = await result.json();
//   document.querySelector(
//     "#welcome"
//   ).innerHTML = `Welcome,  ${data.display_name}!`;
//   console.log(data);
// };
// const getTopArtist = async (token) => {
//   const result = await fetch(
//     "https://api.spotify.com/v1/me/top/artists?limit=50",
//     {
//       method: "GET",
//       headers: { Authorization: "Bearer " + token },
//     }
//   );
//   if (result.ok && result.status === 200) {
//     const data = await result.json();
//     console.log(data);
//     document.querySelector(".artistBox").innerHTML = "";
//     for (let i = 0; i < data.items.length; i++) {
//       // console.log(i + " " + data.artists.items[i].name);
//       if (data.items[i].images.length !== 0) {
//         document.querySelector(".artistBox").innerHTML += `
//           <div>
//           <img src="${data.items[i].images[0].url}" alt=${data.items[0].name} />
//         </div>
//         <div class="artistInfo">
//           <h1>${i + 1}. ${data.items[i].name}</h1>
//           <p>${data.items[i].genres}</p>
//         </div>
//           `;
//       } else {
//         document.querySelector(".artistBox").innerHTML += `
//           <div>
//           <img src="" alt=${data.items[0].name} />
//         </div>
//         <div class="artistInfo">
//           <h1>${i + 1}. ${data.items[i].name}</h1>
//           <p>${data.items[i].genres}</p>
//         </div>
//           `;
//       }
//     }
//   }
// };
// const topTracks = async (token) => {
//   const result = await fetch(
//     "https://api.spotify.com/v1/me/top/tracks?limit=50",
//     {
//       method: "GET",
//       headers: { Authorization: "Bearer " + token },
//     }
//   );
//   if (result.ok && result.status === 200) {
//     const data = await result.json();
//     console.log(data);
//     document.querySelector(".artistBox").innerHTML = "";
//     for (let i = 0; i < data.items.length; i++) {
//       // console.log(i + " " + data.artists.items[i].name);
//       if (data.items[i].album.images.length !== 0) {
//         document.querySelector(".artistBox").innerHTML += `
//           <div>
//           <img src="${data.items[i].album.images[0].url}" alt=${
//           data.items[i].name
//         } />
//         </div>
//         <div class="artistInfo">
//           <h1>${i + 1}. ${data.items[i].name}</h1>
//           <p>${(function artistsOnSong() {
//             let res = "" + data.items[i].artists[0].name;
//             for (let j = 1; j < data.items[i].artists.length; j++) {
//               res += ", " + data.items[i].artists[j].name;
//             }
//             return res;
//           })()}</p>
//         </div>
//           `;
//       } else {
//         document.querySelector(".artistBox").innerHTML += `
//           <div>
//           <img src="" alt=${data.items[i].name} />
//         </div>
//         <div class="artistInfo">
//           <h1>${i + 1}. ${data.items[i].name}</h1>
//           <p>${data.items[i].artists}</p>
//         </div>
//           `;
//       }
//     }
//   }
// };
// const loadData = async () => {
//   //get the token
//   const tokenType = localStorage.getItem("accessToken");
//   console.log("MY print: " + tokenType);
//   // const token = await getToken();
//   // console.log("SECOND PRINT: " + token);
//   //get the genres

//   const artist = await getArtist(tokenType);
//   const me = await meData(tokenType);
//   // const topTrack = await topTracks(tokenType);
//   //populate our genres select element
//   // genres.forEach((element) => UICtrl.createGenre(element.name, element.id));
// };
// const topArtistButton = async () => {
//   //get token
//   const tokenType = localStorage.getItem("accessToken");
//   const topArtists = await getTopArtist(tokenType);
// };
// const topTrackButton = async () => {
//   //get token
//   const tokenType = localStorage.getItem("accessToken");
//   const topTrack = await topTracks(tokenType);
// };
// document.querySelector("#search").addEventListener("click", loadData);
// document.querySelector(".button1").addEventListener("click", topArtistButton);
// document.querySelector(".button2").addEventListener("click", topTrackButton);

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
  const [currentForm, setCurrentForm] = useState("login");
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    // const hash = window.location.hash;
    // console.log(hash.split("&")[0]);
  });

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return !token ? (
    <Login />
  ) : (
    <div className="App">
      <APICalls />
      {/* <Routes>
        {currentForm === "login" ? (
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
        ) : (
          <App />
        )}
        <Route path="/app" />
      </Routes> */}
      {/* {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        // <APICalls />
        
      )} */}
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>Music Mate</p>
    //     {/* <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     > */}
    //     <button>Sign in to Spotify</button>
    //     {/* </a> */}
    //   </header>
    // </div>
  );
}

export default App;
