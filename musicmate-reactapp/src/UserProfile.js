import "./App.css";
import React, { useEffect, useState } from "react";
import APICalls from "./APICalls";
import { useNavigate } from "react-router-dom"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "musicmate-9669c.firebaseapp.com",
  projectId: "musicmate-9669c",
  storageBucket: "musicmate-9669c.appspot.com",
  messagingSenderId: "368024610536",
  appId: "1:368024610536:web:f83d8d41154a5f29800b5d",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const UserProfile = (props) => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [incorr, setInc] = useState("");
  const [loggedIn, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();
  localStorage.setItem("logged_in", false);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users);
    };
    getUsers();
  }, []);

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

    users.map((user) => {
      const dbusername = user.username;
      const dbpassword = user.password;
      // console.log(user.username);
      // console.log(user.password);
      // username === localStorage.getItem("username") &&
      //   password === localStorage.getItem("password")
      // console.log(username + "===" + dbusername);
      // console.log(password + "===" + dbpassword);
      if (document.getElementById("check").checked) {
        if (username === dbusername && password === dbpassword) {
          setInc("");
          setLogin(true);
          localStorage.setItem("logged_in", true);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("username", dbusername);
          console.log("LOGGED IN!");
          // return <APICalls />;
          handleClickHome();
        }
        // else {
        //   setInc("Incorrect Username or password");
        // }
        setInc("Incorrect Username or password");
      } else {
        setInc("Checkbox required");
      }
    });

    // console.log(username);
    // console.log(password);
  };
  return loggedIn ? (
    <APICalls />
  ) : (
    <div className="UserRegister">
      <img className="musicmatelogo" src="../musicmate.jpg" alt="MusicMate" />
      <div className="auth-form-container">
        <h1 className="different">Next, sign into MusicMate!</h1>
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
          <label class="agree">
            <input type="checkbox" id="check" />I acknowledge that MusicMate
            will collect my data and listening statistics for app functionality.
          </label>
          {/* <input type="checkbox" id="agree" />
          <label htmlFor="agree">
            {" "}
            I acknowledge that MusicMate will collect data based on my listening
            history for app functionality.
          </label> */}
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
