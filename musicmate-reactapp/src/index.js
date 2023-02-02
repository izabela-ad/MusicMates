import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import APICalls from "./APICalls";
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Link to="/"></Link> */}
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<APICalls />} />
        <Route path="/signin" element={<UserProfile />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
