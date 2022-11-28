import "./App.css";
//newly added
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Login from "./Login";
//import "./webapp.css";

function APICalls() {
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
        // console.log(i + " " + data.artists.items[i].name);

        if (data.artists.items[i].images.length !== 0) {
          document.querySelector(".artistBox").innerHTML += `
            <div>
            <img src="${data.artists.items[i].images[0].url}" alt=${data.artists.items[0].name} />
          </div>
          <div class="artistInfo">
            <h1>${data.artists.items[i].name}</h1>
            <p>${data.artists.items[i].genres}</p>
          </div>
            `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
            <div>
            <img src="" alt=${data.artists.items[0].name} />
          </div>
          <div class="artistInfo">
            <h1>${data.artists.items[i].name}</h1>
            <p>${data.artists.items[i].genres}</p>
          </div>
            `;
        }
      }
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
    ).innerHTML = `Welcome,  ${data.display_name}!`;
    console.log(data);
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
      document.querySelector(".artistBox").innerHTML = "";
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].images.length !== 0) {
          document.querySelector(".artistBox").innerHTML += `
          <div>
          <img src="${data.items[i].images[0].url}" alt=${data.items[0].name} />
        </div>
        <div class="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].genres}</p>
        </div>
          `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
          <div>
          <img src="" alt=${data.items[0].name} />
        </div>
        <div class="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].genres}</p>
        </div>
          `;
        }
      }
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
      document.querySelector(".artistBox").innerHTML = "";
      for (let i = 0; i < data.items.length; i++) {
        // console.log(i + " " + data.artists.items[i].name);
        if (data.items[i].album.images.length !== 0) {
          document.querySelector(".artistBox").innerHTML += `
          <div>
          <img src="${data.items[i].album.images[0].url}" alt=${
            data.items[i].name
          } />
        </div>
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
          `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
          <div>
          <img src="" alt=${data.items[i].name} />
        </div>
        <div class="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].artists}</p>
        </div>
          `;
        }
      }
    }
  };
  const tokenType = localStorage.getItem("accessToken");
  // let loggedout = false;
  const loadData = async () => {
    //get the token
    // const tokenType = localStorage.getItem("accessToken");
    console.log("MY print: " + tokenType);
    // const token = await getToken();
    // console.log("SECOND PRINT: " + token);
    //get the genres

    const artist = await getArtist(tokenType);

    // const topTrack = await topTracks(tokenType);
    //populate our genres select element
    // genres.forEach((element) => UICtrl.createGenre(element.name, element.id));
  };
  const welcome = async () => {
    // const tokenType = localStorage.getItem("accessToken");
    const me = await meData(tokenType);
  };
  const topArtistButton = async (time_range) => {
    //get token
    // const tokenType = localStorage.getItem("accessToken");
    const topArtists = await getTopArtist(tokenType, time_range);
  };
  const topTrackButton = async (time_range) => {
    //get token
    // const tokenType = localStorage.getItem("accessToken");
    const topTrack = await topTracks(tokenType, time_range);
  };
  welcome();

  // document.querySelector("#search").addEventListener("click", loadData);
  // document.querySelector(".button1").addEventListener("click", topArtistButton);
  // document.querySelector(".button2").addEventListener("click", topTrackButton);
  const [loggedOut, setLog] = useState(false);
  const defaultTime = "medium_term";

  return loggedOut ? (
    <Login />
  ) : (
    <div className="container">
      <div class="welcome"></div>
      <div class="tab">
        <input
          type="radio"
          name="css-tabs"
          id="tab-1"
          defaultChecked
          class="tab-switch"
        />
        <label htmlFor="tab-1" class="tab-label">
          Search
        </label>

        <div class="searchBox">
          <input id="artistName" type="text" placeholder="Artist Name" />
          <button id="search" onClick={loadData}>
            🔎
          </button>
        </div>
      </div>
      <div class="tab">
        <input
          // type="button"
          type="radio"
          name="css-tabs"
          id="tab-2"
          class="tab-switch"
          // onClick={() => topArtistButton(defaultTime)}
        />
        <div>
          <button class="button1" onClick={() => topArtistButton("short_term")}>
            4 weeks
          </button>
          <button
            class="button1"
            onClick={() => topArtistButton("medium_term")}
          >
            6 months
          </button>
          <button class="button1" onClick={() => topArtistButton("long_term")}>
            All-Time
          </button>
        </div>
        <label htmlFor="tab-2" class="tab-label">
          Top Artists
        </label>
        {/* <button class="button1" onClick={topArtistButton}>
          Top Artists
        </button> */}
      </div>
      <div class="tab">
        <input
          type="radio"
          name="css-tabs"
          id="tab-3"
          class="tab-switch"
          // onClick={() => topTrackButton(defaultTime)}
        />
        <div>
          <button class="button1" onClick={() => topTrackButton("short_term")}>
            4 weeks
          </button>
          <button class="button1" onClick={() => topTrackButton("medium_term")}>
            6 months
          </button>
          <button class="button1" onClick={() => topTrackButton("long_term")}>
            All-Time
          </button>
        </div>
        <label htmlFor="tab-3" class="tab-label">
          Top Tracks
        </label>
        {/* <button class="button2">Top Tracks</button> */}
      </div>
      <div class="tab">
        <input
          type="button"
          name="css-tabs"
          id="tab-4"
          class="tab-switch"
          onClick={() => setLog(true)}
        />
        <label htmlFor="tab-4" class="tab-label">
          Logout
        </label>
        {/* <button class="button2">Top Tracks</button> */}
      </div>

      <div className="container">
        {/* <button class="logout" onClick={() => setLog(true)}>
          Logout
        </button> */}
      </div>

      <div class="topBox"></div>
      <div class="artistBox"></div>
    </div>
  );
}
export default APICalls;
