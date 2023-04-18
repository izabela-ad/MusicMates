import React from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Callback from "./Callback";
import "./App.css";

var client_secret = ""; // Your secret
var CLIENT_ID = "1d749561a8d143a996cf153f2f3ed2b2"; // Your client id here!
// const querystring = require("querystring");
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/callback";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-top-read",
];
const scope =
  "user-read-currently-playing user-read-playback-state playlist-read-private user-top-read";
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

const Login = (props) => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/signin");
  // };
  // const location = useLocation();
  const generateRandomString = (length) => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return base64encode(digest);
  }
  // const state = generateRandomString(16);
  const codeVerifier = generateRandomString(128);
  const handleLogin = () => {
    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = generateRandomString(16);
      // let scope = "user-read-private user-read-email";

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URL_AFTER_LOGIN,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.location = "https://accounts.spotify.com/authorize?" + args;
    });
  };

  // console.log(generateCodeChallenge(codeVerifier));
  // useEffect(() => {
  //   console.log("exe");
  //   // if (window.location.hash) {
  //   //   const { access_token, expires_in, token_type } =
  //   //     getReturnedParamsFromSpotifyAuth(window.location.hash);
  //   localStorage.clear();

  //   // localStorage.setItem("accessToken", access_token);
  //   localStorage.setItem("code_verifier", codeVerifier);
  //   // localStorage.setItem("tokenType", token_type);
  //   // localStorage.setItem("expiresIn", expires_in);
  //   // console.log(access_token);
  //   // console.log(token_type);
  //   // console.log(expires_in);
  //   // handleClick();
  // });
  // const queryParams = querystring.stringify({
  //   client_id: CLIENT_ID,
  //   redirect_uri: REDIRECT_URL_AFTER_LOGIN,
  //   scope: SCOPES_URL_PARAM,
  //   response_type: "token",
  //   show_dialog: true,
  // });
  // client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  // ${queryParams} client_id=338d44506db14989b5b97b4e2139ad1a&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=user-read-currently-playing%2520user-read-playback-state%2520playlist-read-private%2520user-top-read&response_type=token&show_dialog=true
  // client_id=338d44506db14989b5b97b4e2139ad1a&redirect_uri=http://localhost:3000/&scope=user-read-currently-playing%20user-read-playback-state%20playlist-read-private%20user-top-read&response_type=token&show_dialog=true

  console.log("codeVerifier:", codeVerifier);
  // console.log(codeVerifier);
  // const history = useHistory();
  // const handleLogin = () => {
  //   // history.push({
  //   //   pathname: "/callback",
  //   //   state: { myVar: codeVerifier },
  //   // });

  //   window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=code&state=${state}&show_dialog=true`;
  //   // navigate("/callback", { state: { myVar: codeVerifier } });

  //   // codeForToken();
  // };
  // const loadFetchParams = () => {

  //   codeForToken
  // };

  //   ?grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}`
  // const codeForToken = async () => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const code = searchParams.get("code");
  //   const codeVerifier = localStorage.getItem("code_verifier");
  //   console.log("myParam:", code);
  //   console.log("codeVerifier:", codeVerifier);
  //   const body = new URLSearchParams({
  //     grant_type: "authorization_code",
  //     code: code,
  //     redirect_uri: REDIRECT_URL_AFTER_LOGIN,
  //     client_id: CLIENT_ID,
  //     code_verifier: codeVerifier,
  //   });
  //   const result = await fetch("https://accounts.spotify.com/api/token", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/x-www-form-urlencoded",
  //     },
  //     body: body,
  //     // headers: { Authorization: "Bearer " + token },
  //   });
  //   if (result.ok && result.status === 200) {
  //     const data = await result.json();
  //     console.log(data);
  //   }
  // };

  // app.get("/", (req, res) => {
  //   res.send("Callback");
  // });
  // const url = require("url"); // built-in utility
  // console.log(request.url);
  // const code = request.query.code || null;

  // const codeForToken = async (token) => {

  //   const result = await fetch(
  //     `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}`,
  //     {
  //       method: "POST",

  //       headers: { Authorization: "Bearer " + token },
  //     }
  //   );
  //   if (result.ok && result.status === 200) {
  //     const data = await result.json();
  //   }
  // };

  return (
    <div className="container">
      <h3 id="animate-charcter">MUSICMATE</h3>
      <h2 id="hometext">A social media app for music lovers.</h2>
      <button className="spotify" onClick={handleLogin}>
        <img id="spotifyicon" src="../assets/spotifyicon.png" width="40" />
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
