import "./App.css";
//newly added
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Login from "./Login";
import APICalls from "./APICalls";
//import "./webapp.css";

export const UserProfile = (props) => {
  //   async function storeData() {

  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [incorr, setInc] = useState("");
  const [loggedIn, setLogin] = useState(false);
  // document.querySelector("#fname").value;
  // const password = document.querySelector("#lname").value;
  // console.log(username);
  // console.log(password);
  //   }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === localStorage.getItem("username") &&
      password === localStorage.getItem("password")
    ) {
      setInc("");
      setLogin(true);
      console.log("LOGGED IN!");
      return <APICalls />;
    } else {
      setInc("Incorrect Username or password");
    }
    console.log(username);
    console.log(password);
  };
  return loggedIn ? (
    <APICalls />
  ) : (
    <div className="UserRegister">
      <div className="auth-form-container">
        <h1 id="different">Next, sign into MusicMates!</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label for="fname">Username:</label>
          <input
            value={username}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            id="fname"
            name="fname"
          ></input>
          <label for="lname">Password:</label>
          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="lname"
            name="lname"
          ></input>
          <p>{incorr}</p>
          <input type="submit" id="submit" value="Sign in"></input>
        </form>{" "}
        <button
          className="switchpage"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register here
        </button>
      </div>
    </div>
  );
};
export default UserProfile;
