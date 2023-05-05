import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";
import APICalls from "./APICalls";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const handleLoad1 = () => {
    navigate("/login");
  };
  const handleClick = () => {
    navigate("/register");
  };
  const handleClick2 = () => {
    navigate("/signin");
  };
  console.log(location.pathname);
  function handleLogin() {
    handleLoad1();
  }

  useEffect(() => {
    if ((location.pathname = "\\")) {
      handleLoad1();
    }
  }, []);

  return !token ? (
    <Login />
  ) : currentForm === "login" ? (
    <div className="App">{}</div>
  ) : (
    <UserRegister />
  );
}

export default App;
