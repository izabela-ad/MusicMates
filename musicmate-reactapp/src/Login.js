import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

var client_secret = "4bee38dffab14a208a96c957724778e0"; // Your secret
var CLIENT_ID = "1d749561a8d143a996cf153f2f3ed2b2"; // Your client id

const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-top-read",
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

const Login = (props) => {
  const navigate = useNavigate();
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
    navigate("/app");
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;

    // "${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL_AFTER_LOGIN}&response_type=token&show_dialog=true";
  };

  return (
    <div className="container">
      {/* <h1>MusicMate</h1> */}

      {/* <img src={require("./musicmate.jpg")} /> */}
      {/*  */}
      <button onClick={handleLogin}>Login into Spotify</button>
    </div>
  );
};

export default Login;
