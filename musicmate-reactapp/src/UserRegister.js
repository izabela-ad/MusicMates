import "./App.css";
//newly added
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "musicmate-9669c.firebaseapp.com",
  projectId: "musicmate-9669c",
  storageBucket: "musicmate-9669c.appspot.com",
  messagingSenderId: "368024610536",
  appId: "1:368024610536:web:f83d8d41154a5f29800b5d",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const UserRegister = (props) => {
  //   async function storeData() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [password2, setPass2] = useState("");
  const [register, setReg] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setReg("Passwords do not match");
    } else {
      setReg("");

      const createUser = async () => {
        await addDoc(usersCollectionRef, {
          username: username,
          password: password,
        });
      };
      createUser();

      handleClick();
    }
    console.log(username);
    console.log(password);
    console.log(password2);
  };
  return (
    <div className="UserRegister">
      <img className="musicmatelogo" src="../musicmate.jpg" alt="MusicMate" />
      <div className="auth-form-container">
        <h1 className="different">Sign up!</h1>
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
          <label htmlFor="lname">Repeat Password:</label>
          <input
            value={password2}
            onChange={(e) => setPass2(e.target.value)}
            type="password"
            id="lname"
            name="lname"
          ></input>
          <p className="redtext">{register}</p>

          <input type="submit" className="formButton" value="Register"></input>
        </form>{" "}
        <button className="switchpage" onClick={handleClick}>
          Already have an Account? Login here
        </button>
      </div>
    </div>
  );
};
export default UserRegister;
