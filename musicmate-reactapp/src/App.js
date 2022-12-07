import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  });

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return !token ? (
    <Login />
  ) : currentForm === "login" ? (
    <div className="App">
      <UserProfile onFormSwitch={toggleForm} />
    </div>
  ) : (
    <UserRegister onFormSwitch={toggleForm} />
  );
}

export default App;
