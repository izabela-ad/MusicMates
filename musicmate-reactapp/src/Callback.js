import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/callback";
const codeVerifier = localStorage.getItem("code_verifier");
var CLIENT_ID = "1d749561a8d143a996cf153f2f3ed2b2";
const Callback = () => {
  //   useEffect(() => {
  //     const searchParams = new URLSearchParams(props.location.search);
  //     const myParam = searchParams.get("myParam");
  //     console.log("myParam:", myParam);{ location }
  //   }, []);
  //   const MyComponent = ({ match, location }) => {
  //   const { myVar } = location.state;
  // Use myVar here
  //   };
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  //   console.log("myParam:", code);
  //   console.log("codeVerifier:", codeVerifier);
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URL_AFTER_LOGIN,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier,
  });
  console.log(body.toString());
  //   ?grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}`
  //   const codeForToken = async () => {
  //     const result = await fetch(
  //       `https://accounts.spotify.com/api/token?${body.toString()}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/x-www-form-urlencoded",
  //         },
  //         //   body: body,
  //         // headers: { Authorization: "Bearer " + token },
  //       }
  //     );
  //     if (result.ok && result.status === 200) {
  //       const data = await result.json();
  //       //   console.log(data);
  //     } else {
  //       console.log(result.status + " " + result.message);
  //       //   console.log(error);
  //     }
  //   };
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

  //   const response = async () => {
  //     const me = await codeForToken();
  //   };
  //   response();
};

export default Callback;
