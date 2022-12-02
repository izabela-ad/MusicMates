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
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";
//import "./webapp.css";

/*
url after redirect login
http://localhost:3000/#access_token=BQCI5nH4zRAWJtOXGmLMnZtgIWoScWSwSYz_eFgolhJWLk8ySVeAyRcYXmhTGpjmBfVZflUz03EghfZgIXGE7gooqqFNEafSmuTLlOXoz9I3Hhg-Bnr-dGqTnLeYHkvv3gAtX3ID8fTczNOTODYaiNR6vWG8JbvLPGg86g7YDMIIpYzHporNw4hMOuDn9LsFGw&token_type=Bearer&expires_in=3600
*/

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
    // <Link to="/login">login</Link>
    <Login />
  ) : currentForm === "login" ? (
    //
    // <Login />
    <div className="App">
      {/* <Link to="/home">home</Link> */}
      {/* <Link to="/home" /> */}
      {/* <Link to="login">login</Link>
        <Link to="/">app</Link> */}

      <UserProfile onFormSwitch={toggleForm} />
      {/* <APICalls /> */}
      {/* <UserRegister /> */}
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
    <APICalls />

        )} */}
    </div>
  ) : (
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
    <UserRegister onFormSwitch={toggleForm} />
  );
}

export default App;
