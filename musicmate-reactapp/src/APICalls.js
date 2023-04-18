import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import $, { get } from "jquery";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

// import(RegExp);
// require("dotenv").config();
// const apiKey = ;
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
const db = getFirestore(app);

function APICalls() {
  // const navigate = useNavigate();
  const handleOnClick = () => navigate("/chat");
  $(document).ready(() => dragElement(document.getElementById("mydiv")));
  var script = document.createElement("script");
  script.type = "text/javascript";

  script.src =
    "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js";
  document.body.appendChild(script);
  function dragElement(elmnt) {
    // console.log(elmnt);
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function animateDivs() {
    $(document).ready(function ($) {
      (function fadeNext(collection) {
        // console.log("exe");
        collection.eq(0).fadeIn(300, function () {
          (collection = collection.slice(1)).length && fadeNext(collection);
        });
      })($(".resultBox"));
    });
  }
  const navigate = useNavigate();
  const loadingFBArtists = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      // console.log(localStorage.getItem("user_id"));

      // const arr = [];
      const map = new Map();
      for (let m = 0; m < Math.min(data.items.length, 20); m++) {
        map.set(data.items[m].name, 20 - m);
      }
      // console.log(map);
      const obj = Object.fromEntries(map);
      const newFields = { topArtists: obj };
      // console.log(newFields);
      const updateUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await updateDoc(userDoc, newFields);
      };
      updateUser(localStorage.getItem("user_id"));
    }
  };
  const loadingFBGenres = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      var genreCount = {};
      for (let i = 0; i < data.items.length; i++) {
        for (let j = 0; j < data.items[i].genres.length; j++) {
          if (data.items[i].genres[j] in genreCount) {
            genreCount[data.items[i].genres[j]] +=
              (50 - i) * (1 / data.items[i].genres.length);
          } else {
            genreCount[data.items[i].genres[j]] =
              (50 - i) * (1 / data.items[i].genres.length);
          }
        }
      }
      // console.log(genreCount);
      var items = Object.keys(genreCount).map(function (key) {
        return [key, genreCount[key]];
      });
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      items = items.slice(0, 10);
      var count = 0;
      for (let k = 0; k < items.length; k++) {
        count += items[k][1];
      }
      const map = new Map();
      for (let l = 0; l < items.length; l++) {
        // console.log(localStorage.getItem("user_id"));
        map.set(items[l][0], Math.round((items[l][1] / count) * 10000) / 100);
      }
      const obj = Object.fromEntries(map);
      const newFields = { topGenres: obj };
      // console.log(newFields);
      const updateUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await updateDoc(userDoc, newFields);
      };
      updateUser(localStorage.getItem("user_id"));
    }
  };
  const getArtist = async (token) => {
    const name = document.querySelector("#artistName").value;
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${name}&type=artist`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      console.log(data);

      document.querySelector(".artistBox").innerHTML = "";
      for (let i = 0; i < data.artists.items.length; i++) {
        if (data.artists.items[i].images.length !== 0) {
          document.querySelector(".artistBox").innerHTML += `
            <div class="resultBox">
            <img src="${data.artists.items[i].images[0].url}" alt=${data.artists.items[0].name} />
            <div class="artistInfo">
            <h1>${data.artists.items[i].name}</h1>
            <p>${data.artists.items[i].genres}</p>
          </div>
          </div>
          
            `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
            <div class="resultBox">
            <img src="" alt=${data.artists.items[0].name} />
            <div class="artistInfo">
            <h1>${data.artists.items[i].name}</h1>
            <p>${data.artists.items[i].genres}</p>
          </div>
          </div>
          
            `;
        }
      }
      animateDivs();
    }
  };
  const meData = async (token) => {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const data = await result.json();

    document.querySelector(
      ".welcome"
    ).innerHTML = `Welcome,  ${localStorage.getItem("username")}!
    <img src ="${data.images[0].url}" id="homePhoto" >`;
    console.log(data);
    console.log(data.images[0].url);
    const newFields = { image: data.images[0].url };
    const updateUser = async (id) => {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, newFields);
    };
    updateUser(localStorage.getItem("user_id"));
  };
  const getTopArtist = async (token, time_range) => {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time_range}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      console.log(data);
      if (time_range === "long_term") {
        console.log(localStorage.getItem("user_id"));

        // const arr = [];
        const map = new Map();
        for (let m = 0; m < Math.min(data.items.length, 20); m++) {
          map.set(data.items[m].name, 20 - m);
        }
        // console.log(map);
        const obj = Object.fromEntries(map);
        const newFields = { topArtists: obj };
        // console.log(newFields);
        const updateUser = async (id) => {
          const userDoc = doc(db, "users", id);
          await updateDoc(userDoc, newFields);
        };
        updateUser(localStorage.getItem("user_id"));
      }
      // Get all buttons with the "button1" class
      if (time_range === "short_term") {
        var buttons = document.querySelectorAll(".button1");
        buttons.forEach(function (button) {
          button.classList.remove("active");
        });
        var button = document.getElementById("4weeks");
        button.classList.add("active");
      }

      document.querySelector(".artistBox").innerHTML = "";
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].images.length !== 0) {
          document.querySelector(".artistBox").innerHTML += `
          <div class="resultBox">
          <img src="${data.items[i].images[0].url}" alt=${data.items[0].name} />
          <div class="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].genres}</p>
        </div>
        </div>
        
          `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
          <div class="resultBox">
          <img src="" alt=${data.items[0].name} />
          <div class="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].genres}</p>
        </div>
        </div>
        
          `;
        }
      }
      animateDivs();
    }
  };
  const topTracks = async (token, time_range) => {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${time_range}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      console.log(data);
      if (time_range === "short_term") {
        var buttons = document.querySelectorAll(".button1");
        buttons.forEach(function (button) {
          button.classList.remove("active");
        });
        var button = document.getElementById("4weeks2");
        button.classList.add("active");
      }

      document.querySelector(".artistBox").innerHTML = "";
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].album.images.length !== 0) {
          document.querySelector(".artistBox").innerHTML += `
          <div class="resultBox">
          <img src="${data.items[i].album.images[0].url}" alt=${
            data.items[i].name
          } />
          <div class="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${(function artistsOnSong() {
            let res = "" + data.items[i].artists[0].name;
            for (let j = 1; j < data.items[i].artists.length; j++) {
              res += ", " + data.items[i].artists[j].name;
            }
            return res;
          })()}</p>
        </div>
        </div>
        
          `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
          <div class="resultBox">
          <img src="" alt=${data.items[i].name} />
          <div class="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].artists}</p>
        </div>
        </div>
        
          `;
        }
      }
      animateDivs();
    }
  };
  const seeGenres = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      console.log(data);
    }
  };
  const tempGenres = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      console.log(data);
      var genreCount = {};
      for (let i = 0; i < data.items.length; i++) {
        for (let j = 0; j < data.items[i].genres.length; j++) {
          if (data.items[i].genres[j] in genreCount) {
            genreCount[data.items[i].genres[j]] +=
              (50 - i) * (1 / data.items[i].genres.length);
          } else {
            genreCount[data.items[i].genres[j]] =
              (50 - i) * (1 / data.items[i].genres.length);
          }
        }
      }
      console.log(genreCount);
      var items = Object.keys(genreCount).map(function (key) {
        return [key, genreCount[key]];
      });
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      items = items.slice(0, 10);
      var count = 0;
      for (let k = 0; k < items.length; k++) {
        count += items[k][1];
      }
      const map = new Map();
      for (let l = 0; l < items.length; l++) {
        console.log(localStorage.getItem("user_id"));
        map.set(items[l][0], Math.round((items[l][1] / count) * 10000) / 100);
        document.querySelector(".artistBox").innerHTML += `
        <div class="pie animate" style="--p:${
          Math.round((items[l][1] / count) * 10000) / 100
        };--c:${
          "rgb(" +
          Math.floor(Math.random() * 255) +
          "," +
          Math.floor(Math.random() * 255) +
          "," +
          Math.floor(Math.random() * 255) +
          ")"
        }"> ${items[l][0]}, ${
          Math.round((items[l][1] / count) * 10000) / 100
        }%</div>
       `;
      }
      // <p> </p></br>
      // console.log(map);
      const obj = Object.fromEntries(map);
      const newFields = { topGenres: obj };
      // console.log(newFields);
      const updateUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await updateDoc(userDoc, newFields);
      };
      updateUser(localStorage.getItem("user_id"));
    }
  };
  console.log("access_token: " + localStorage.getItem("access-token"));
  const tokenType = localStorage.getItem("access-token");
  const loadFBData = async () => {
    const artists = await loadingFBArtists(tokenType);
    const genres = await loadingFBGenres(tokenType);
  };
  const loadData = async () => {
    const artist = await getArtist(tokenType);
  };
  const loadGenre = async () => {
    const genres = await seeGenres(tokenType);
  };
  const loadGenres = async () => {
    const genres2 = await tempGenres(tokenType);
  };
  const welcome = async () => {
    const me = await meData(tokenType);
  };
  const topArtistButton = async (time_range) => {
    const topArtists = await getTopArtist(tokenType, time_range);
  };
  const topTrackButton = async (time_range) => {
    const topTrack = await topTracks(tokenType, time_range);
  };
  welcome();
  const [loggedOut, setLog] = useState(false);
  // console.log("localstor:" + localStorage.getItem("logged_in"));
  // const logged_in = localStorage.getItem("logged_in");
  // console.log(logged_in);
  // if (false) {
  //   console.log("exe");
  //   // setLog(true);
  //   handleClick();
  // }
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(users);
    };
    getUsers();
  }, []);
  const populateFriends = async () => {
    document.querySelector(".friendContainer").innerHTML = "";
    users.map((user) => {
      const dbusername = user.username;
      if (dbusername !== localStorage.getItem("username")) {
        document.querySelector(
          ".friendContainer"
        ).innerHTML += `<div class ="anotherFriendCon"><img src ="${user.image}" class="friendPhotos" >
        <button id="${user.id}"class="calculateFriend">${dbusername}</button></div>`;
      }
    });
    // <h1>${dbusername}</h1>document.querySelector(".artistBox").innerHTML += `<p></p>`;
  };
  populateFriends();
  // const buttonId = "";
  const handleButton = (event) => {
    const button = event.target.closest("button");
    if (button) {
      // buttonId = button.id;
      console.log(button.id);
      localStorage.setItem("button_id", button.id);

      navigate("/compare");
    }
  };
  // Get all buttons with the "btn" class
  var buttons = document.querySelectorAll(".button1");

  // Loop through all buttons and add a click event listener to each one
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove the "active" class from all buttons
      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      // Add the "active" class to the clicked button
      this.classList.add("active");
    });
  });

  function print() {
    const tabs = document.querySelectorAll("[data-tab-target]");
    // console.log(tabs);
    const tabContents = document.querySelectorAll("[data-tab-content]");
    tabs.forEach(async (tab) => {
      tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        console.log(target);
        const glider = document.querySelector(".glider");

        tabContents.forEach((tabContent) => {
          tabContent.classList.remove("active");
        });
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        document.querySelector(".artistBox").innerHTML = "";
        // console.log("executes");

        // console.log(tab);
        // console.log(tab.);
        const idName = target.getAttribute("id");
        // console.log();
        if (idName === "friends") {
          glider.style.transform = "translateX(0%)";
          tab.classList.add("active");
          target.classList.add("active");
          // tab.style.color = "#185ee0";
        }

        if (idName === "topArtists") {
          glider.style.transform = "translateX(100%)";
          tab.classList.add("active");
          target.classList.add("active");
          // tab.style.color = "#185ee0";
        }
        if (idName === "topTracks") {
          glider.style.transform = "translateX(200%)";
          tab.classList.add("active");
          target.classList.add("active");
          // tab.style.color = "#185ee0";
        }
        if (idName === "topGenres") {
          glider.style.transform = "translateX(300%)";
          tab.classList.add("active");
          target.classList.add("active");
          // tab.style.color = "#185ee0";
        }
        if (idName === "search") {
          glider.style.transform = "translateX(400%)";
          tab.classList.add("active");
          target.classList.add("active");
          // tab.style.color = "#185ee0";
        }
        if (idName === "ticketmaster") {
          glider.style.transform = "translateX(500%)";
          tab.classList.add("active");
          target.classList.add("active");
          // tab.style.color = "#185ee0";
        }
      });
    });
  }
  $(document).ready(() => print());
  $(document).ready(() => loadFBData());
  // $(document).ready(() => buttonActive());

  const handleClick = () => {
    localStorage.setItem("logged_in", false);
    navigate("/");
  };

  return loggedOut ? (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  ) : (
    // <Login />
    <div className="container">
      <div className="welcome"></div>
      <ul className="tabs">
        <li
          data-tab-target="#friends"
          className="active tab"
          onClick={() => populateFriends()}
        >
          Friends
        </li>

        <li
          data-tab-target="#topArtists"
          className="tab"
          onClick={() => topArtistButton("short_term")}
        >
          Top Artists
        </li>
        <li
          data-tab-target="#topTracks"
          className="tab"
          onClick={() => topTrackButton("short_term")}
        >
          Top Tracks
        </li>
        <li
          input
          type="button"
          data-tab-target="#topGenres"
          className="tab"
          onClick={() => loadGenres()}
        >
          Top Genres
        </li>
        <li data-tab-target="#search" className="tab">
          Search
        </li>
        <li data-tab-target="#ticketmaster" className="tab">
          Ticketmaster
        </li>
        <li data-tab-target="#chat" className="tab" onClick={handleOnClick}>
          Chat
        </li>
        <span class="glider"></span>
      </ul>

      <div className="tab-content">
        <div id="friends" data-tab-content className="active">
          <div className="friendContainer" onClick={handleButton}></div>
        </div>

        <div id="topArtists" data-tab-content>
          <button
            className="button1"
            id="4weeks"
            onClick={() => topArtistButton("short_term")}
          >
            4 weeks
          </button>
          <button
            className="button1"
            onClick={() => topArtistButton("medium_term")}
          >
            6 months
          </button>
          <button
            className="button1"
            onClick={() => topArtistButton("long_term")}
          >
            All-Time
          </button>
        </div>
        <div id="topTracks" data-tab-content>
          <button
            className="button1"
            id="4weeks2"
            onClick={() => topTrackButton("short_term")}
          >
            4 weeks
          </button>
          <button
            className="button1"
            onClick={() => topTrackButton("medium_term")}
          >
            6 months
          </button>
          <button
            className="button1"
            onClick={() => topTrackButton("long_term")}
          >
            All-Time
          </button>
        </div>
        <div id="topGenres" data-tab-content></div>
        <div id="search" data-tab-content>
          <div className="searchBox">
            <input id="artistName" type="text" placeholder="Artist Name" />
            <button className="search" onClick={loadData}>
              🔎
            </button>
          </div>
        </div>
        <div id="ticketmaster" data-tab-content>
          <div id="mydiv">
            <div id="mydivheader">Click and drag for events!</div>
            <div
              w-type="event-discovery"
              w-tmapikey="Hx0kW4rNJ6whGxOFbqhm9BtDavqfDTmE"
              w-googleapikey="YOUR_GOOGLE_API_KEY"
              w-keyword=""
              w-theme="simple"
              w-colorscheme="light"
              w-width="350"
              w-height="600"
              w-size="25"
              w-border="0"
              w-borderradius="4"
              w-postalcode=""
              w-radius="25"
              w-city="Los Angeles"
              w-period="week"
              w-layout="vertical"
              w-attractionid=""
              w-promoterid=""
              w-venueid=""
              w-affiliateid=""
              w-segmentid=""
              w-proportion="custom"
              w-titlelink="off"
              w-sorting="groupByName"
              w-id="id_05ibir"
              w-countrycode="US"
              w-source=""
              w-branding="Ticketmaster"
              w-latlong=""
            ></div>
          </div>
        </div>
      </div>
      <button id="logout" onClick={handleClick}>
        Log out
      </button>

      <div className="topBox"></div>
      <div className="artistBox"></div>
    </div>
  );
}
export default APICalls;
