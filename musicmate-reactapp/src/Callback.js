import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/callback";
const codeVerifier = localStorage.getItem("code_verifier");
var CLIENT_ID = "1d749561a8d143a996cf153f2f3ed2b2";
const Callback = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URL_AFTER_LOGIN,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier,
  });
  console.log(body.toString());

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };
  useEffect(() => {
    const codeForToken = fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access-token", data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("access_token: " + localStorage.getItem("access-token"));
    handleClick();
  }, []);

};

export default Callback;
