import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";
import APICalls from "./APICalls";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  });

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  const handleClick2 = () => {
    navigate("/signin");
  };
  // console.log(token);
  // console.log(currentForm);
  return !token ? (
    <Login />
  ) : // <Routes>
  //   <Route path="/login" element={<Login />} />
  //   <Route
  //     path="/signin"
  //     element={<UserProfile />}
  //     onFormSwitch={toggleForm}
  //   />
  //   <Route
  //     path="/register"
  //     element={<UserRegister />}
  //     onFormSwitch={toggleForm}
  //   />
  // </Routes>
  currentForm === "login" ? (
    // handleClick2();
    <div className="App">
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/signin"
          element={<UserProfile />}
          onFormSwitch={toggleForm}
        />
        <Route
          path="/register"
          element={<UserRegister />}
          onFormSwitch={toggleForm}
        />
        <Route path="/home" element={<APICalls />} />
      </Routes> */}
      {/* <Navigate replace to="/s" /> */}
      {/* <UserProfile /> */}
      {/* <UserProfile onFormSwitch={toggleForm} /> */}
      {/* <a onClick={handleClick}>Register</a>
      <a onClick={handleClick2}>Sign Up</a> */}
      {/* <Link replace to="/register">
        register
      </Link>
      <Link replace to="/signin">
        Sign in
      </Link> */}
    </div>
  ) : (
    // <Routes>
    //   <Route
    //     path="/register"
    //     element={<UserRegister />}
    //     onFormSwitch={toggleForm}
    //   />
    // </Routes>
    // <div className="App">
    <UserRegister />
  );
}

export default App;
