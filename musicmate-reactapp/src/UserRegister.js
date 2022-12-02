import "./App.css";
//newly added
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Login from "./Login";
import UserProfile from "./UserProfile";
//import "./webapp.css";

export const UserRegister = (props) => {
  //   async function storeData() {

  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [password2, setPass2] = useState("");
  const [register, setReg] = useState("");
  // document.querySelector("#fname").value;
  // const password = document.querySelector("#lname").value;
  // console.log(username);
  // console.log(password);
  //   }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setReg("Passwords do not match");
    } else {
      setReg("");
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      props.onFormSwitch("login");
    }
    console.log(username);
    console.log(password);
    console.log(password2);
  };
  return (
    <div className="UserRegister">
      <div className="auth-form-container">
        <h1 id="different">Sign up!</h1>
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
          <label for="lname">Repeat Password:</label>
          <input
            value={password2}
            onChange={(e) => setPass2(e.target.value)}
            type="password"
            id="lname"
            name="lname"
          ></input>
          <p>{register}</p>
          <input type="submit" id="submit" value="Register"></input>
        </form>{" "}
        <button
          className="switchpage"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an Account? Login here
        </button>
      </div>
    </div>
  );
};
export default UserRegister;
