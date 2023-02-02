import "./App.css";
import React, { useEffect, useState } from "react";
import APICalls from "./APICalls";
import { useNavigate } from "react-router-dom";

export const UserProfile = (props) => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [incorr, setInc] = useState("");
  const [loggedIn, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  const handleClickHome = () => {
    navigate("/home");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === localStorage.getItem("username") &&
      password === localStorage.getItem("password")
    ) {
      setInc("");
      setLogin(true);
      console.log("LOGGED IN!");
      // return <APICalls />;
      handleClickHome();
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
          <p>{incorr}</p>
          <input type="submit" id="submit" value="Sign in"></input>
        </form>{" "}
        <button
          className="switchpage"
          onClick={handleClick}
          // onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register here
        </button>
      </div>
    </div>
  );
};
export default UserProfile;
