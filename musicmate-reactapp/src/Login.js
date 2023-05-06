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
  const codeVerifier = generateRandomString(128);
  const handleLogin = () => {
    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = generateRandomString(16);

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

  console.log("codeVerifier:", codeVerifier);

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
