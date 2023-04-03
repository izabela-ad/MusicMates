import "./App.css";
//newly added
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };
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
      // props.onFormSwitch("login");
      handleClick();
    }
    console.log(username);
    console.log(password);
    console.log(password2);
  };
  return (
    <div className="UserRegister">
      <img
        className="musicmatelogo"
        src="../musicmatecropped.png"
        alt="MusicMate"
      />
      <div className="auth-form-container">
        <h1 className="different">Sign up!</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="file" id="myFile" name="filename" />
          <label htmlFor="fname">Username:</label>
          <input
            value={username}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            id="fname"
            name="fname"
          ></input>
          <label htmlFor="lname">Password:</label>
          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="lname"
            name="lname"
          ></input>
          <label htmlFor="lname">Repeat Password:</label>
          <input
            value={password2}
            onChange={(e) => setPass2(e.target.value)}
            type="password"
            id="lname"
            name="lname"
          ></input>
          <p className="redtext">{register}</p>
          {/* <p>Data is </p> */}
          <input type="submit" className="formButton" value="Register"></input>
        </form>{" "}
        <button
          className="switchpage"
          onClick={handleClick}
          // onClick={() => props.onFormSwitch("login")}
        >
          Already have an Account? Login here
        </button>
      </div>
    </div>
  );
};
export default UserRegister;
