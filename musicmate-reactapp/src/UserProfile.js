import "./App.css";
import React, { useEffect, useState } from "react";
import APICalls from "./APICalls";
import { useNavigate } from "react-router-dom"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_6as5__n3z1QLnurXeXymtJBMr0ts9Vc",
  authDomain: "musicmate-9669c.firebaseapp.com",
  projectId: "musicmate-9669c",
  storageBucket: "musicmate-9669c.appspot.com",
  messagingSenderId: "368024610536",
  appId: "1:368024610536:web:f83d8d41154a5f29800b5d",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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
  function googleAuth(auth, provider) {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        handleClickHome();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
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
        <h1 className="different">Next, sign into MusicMates!</h1>
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
          <p className="redtext">{incorr}</p>
          <input type="submit" className="formButton" value="Sign in"></input>
        </form>{" "}
        <p>Or</p>
        <button
          className="formButton"
          onClick={() => googleAuth(auth, provider)}
          // onClick={() => props.onFormSwitch("register")}
        >
          <img
            id="googlelogo"
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Sign In with Google
        </button>
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
