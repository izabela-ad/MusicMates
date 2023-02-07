import "./App.css";
import React, { useState } from "react";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

function APICalls() {
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
            <div className="resultBox">
            <img src="${data.artists.items[i].images[0].url}" alt=${data.artists.items[0].name} />
            <div className="artistInfo">
            <h1>${data.artists.items[i].name}</h1>
            <p>${data.artists.items[i].genres}</p>
          </div>
          </div>
          
            `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
            <div className="resultBox">
            <img src="" alt=${data.artists.items[0].name} />
            <div className="artistInfo">
            <h1>${data.artists.items[i].name}</h1>
            <p>${data.artists.items[i].genres}</p>
          </div>
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
    ).innerHTML = `Welcome,  ${data.display_name}!
    <img src ="${data.images[0].url}" style="width:50px;height:auto;float:left">`;
    console.log(data);
    console.log(data.images[0].url);
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
          <div className="resultBox">
          <img src="${data.items[i].images[0].url}" alt=${data.items[0].name} />
          <div className="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].genres}</p>
        </div>
        </div>
        
          `;
        } else {
          document.querySelector(".artistBox").innerHTML += `
          <div className="resultBox">
          <img src="" alt=${data.items[0].name} />
          <div className="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].genres}</p>
        </div>
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
        if (data.items[i].album.images.length !== 0) {
          document.querySelector(".artistBox").innerHTML += `
          <div className="resultBox">
          <img src="${data.items[i].album.images[0].url}" alt=${
            data.items[i].name
          } />
          <div className="artistInfo">
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
          <div className="resultBox">
          <img src="" alt=${data.items[i].name} />
          <div className="artistInfo">
          <h1>${i + 1}. ${data.items[i].name}</h1>
          <p>${data.items[i].artists}</p>
        </div>
        </div>
        
          `;
        }
      }
    }
  };
  const tokenType = localStorage.getItem("accessToken");
  const loadData = async () => {
    const artist = await getArtist(tokenType);
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
  function print() {
    const tabs = document.querySelectorAll("[data-tab-target]");
    console.log(tabs);
    const tabContents = document.querySelectorAll("[data-tab-content]");
    tabs.forEach(async (tab) => {
      tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach((tabContent) => {
          tabContent.classList.remove("active");
        });
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        document.querySelector(".artistBox").innerHTML = "";
        console.log("executes");
        tab.classList.add("active");
        target.classList.add("active");
      });
    });
  }
  $(document).ready(() => print());

  const navigate = useNavigate();

  const handleClick = () => {
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
        <li data-tab-target="#search" className="active tab">
          Search
        </li>
        <li data-tab-target="#topArtists" className="tab">
          Top Artists
        </li>
        <li data-tab-target="#topTracks" className="tab">
          Top Tracks
        </li>
        <li
          input
          type="button"
          data-tab-target="#logout"
          className="tab"
          onClick={handleClick}
        >
          Log out
        </li>
      </ul>
      <div className="tab-content">
        <div id="search" data-tab-content className="active">
          <div className="searchBox">
            <input id="artistName" type="text" placeholder="Artist Name" />
            <button className="search" onClick={loadData}>
              🔎
            </button>
          </div>
        </div>
        <div id="topArtists" data-tab-content>
          <button
            className="button1"
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
        <div id="logout" data-tab-content>
          <input type="button" />
        </div>
      </div>
      <div className="container"></div>

      <div className="topBox"></div>
      <div className="artistBox"></div>
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
  );
}
export default APICalls;
