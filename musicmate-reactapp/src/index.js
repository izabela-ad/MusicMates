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
import Callback from "./Callback";
import Compare from "./Compare";
import Chat from "./Chat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Login />} />

      <Route path="/home" element={<APICalls />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/signin" element={<UserProfile />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);



//Creating a navigation bar
const Navigation = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/profilepage" activeStyle>
            MyProfile
          </NavLink>

          <NavLink to="/feed" activeStyle>
            MyFriends
          </NavLink>

        </NavMenu>
      </Nav>
    </>
  )
}

//Styling the navigation bar



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
