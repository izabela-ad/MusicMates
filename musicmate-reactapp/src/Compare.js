import "./App.css";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

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

export const Compare = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  const tokenType = localStorage.getItem("access-token");
  const getArtist = async (token, name) => {
    var img_url = "";
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${name}&type=artist`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (result.ok && result.status === 200) {
      const data = await result.json();
      if (data.artists.items[0].images.length !== 0) {
        img_url = data.artists.items[0].images[0].url;
      }
    }
    return img_url;
  };
  const loadData = async (name) => {
    const artist = await getArtist(tokenType, name);
    return artist;
  };
  const docFriendRef = doc(db, "users", localStorage.getItem("button_id"));
  const docUserRef = doc(db, "users", localStorage.getItem("user_id"));
  var totalSharedCount = 0;
  const someothername = {};
  const getHalfScore = async () => {
    const docFriendSnap = await getDoc(docFriendRef);
    const docUserSnap = await getDoc(docUserRef);
    var artistTotal = 0;
    var genreTotal = 0;
    for (var key in docUserSnap.data().topArtists) {
      if (docFriendSnap.data().topArtists.hasOwnProperty(key)) {
        var addedScore =
          docFriendSnap.data().topArtists[key] +
          docUserSnap.data().topArtists[key];
        artistTotal += addedScore;
      }
    }
    for (var key in docUserSnap.data().topGenres) {
      if (docFriendSnap.data().topGenres.hasOwnProperty(key)) {
        var addedScore =
          docFriendSnap.data().topGenres[key] +
          docUserSnap.data().topGenres[key];
        genreTotal += addedScore;
      }
    }
    console.log("artistTotal: " + artistTotal + " genreTotal: " + genreTotal);
    return (artistTotal / 420.0) * 0.25 + (genreTotal / 200.0) * 0.25;
  };

  const addedScoreObj = {};
  const getSpecifiedDocArtists = async () => {
    const docFriendSnap = await getDoc(docFriendRef);
    const docUserSnap = await getDoc(docUserRef);
    for (var key in docUserSnap.data().topArtists) {
      // console.log(key);
      if (docFriendSnap.data().topArtists.hasOwnProperty(key)) {
        var addedScore = 0;
        addedScore =
          docFriendSnap.data().topArtists[key] +
          docUserSnap.data().topArtists[key];
        addedScoreObj[key] = addedScore;
      }
    }
    const sortedArray = Object.entries(addedScoreObj).sort(
      (a, b) => b[1] - a[1]
    );
    var count = 1;

    for (let [key, value] of sortedArray) {
      const img_url = await loadData(key);

      document.querySelector(".sharedArtistCon").innerHTML += `
        <div class="sharedArtist">
        <img src="${img_url}" class="sharedArtistPhoto"alt=${key} />
        <h1>${count}. ${key}</h1>
        <p>${key} was ${docFriendSnap.data().username}'s #${Math.abs(
        docFriendSnap.data().topArtists[key] - 21
      )} top artist</p>
        <p>${key} was your #${Math.abs(
        docUserSnap.data().topArtists[key] - 21
      )} top artist</p>
        </div>
        `;
      totalSharedCount++;
      if (count === 5) {
        break;
      }

      count++;
    }
    await getSimScore();
  };
  getSpecifiedDocArtists();
  const genreScoreObj = {};
  const getSpecifiedDocGenre = async () => {
    const docFriendSnap = await getDoc(docFriendRef);
    const docUserSnap = await getDoc(docUserRef);
    for (var key in docUserSnap.data().topGenres) {
      if (docFriendSnap.data().topGenres.hasOwnProperty(key)) {
        var addedScore = 0;
        addedScore =
          docFriendSnap.data().topGenres[key] +
          docUserSnap.data().topGenres[key];
        genreScoreObj[key] = addedScore;
      }
    }
    const sortedArray = Object.entries(genreScoreObj).sort(
      (a, b) => b[1] - a[1]
    );
    var count = 1;
    for (let [key, value] of sortedArray) {
      let str = String(key);
      str = str.charAt(0).toUpperCase() + str.slice(1);
      document.querySelector(".sharedGenreCon").innerHTML += `
          <div class="sharedGenre">
          <h1>${count}. ${str}</h1>
          <p>${str} made up ${docFriendSnap.data().topGenres[key]}% of ${
        docFriendSnap.data().username
      }'s listening time.</p>
            <p>${str} made up ${
        docUserSnap.data().topGenres[key]
      }% of your listening time.</p>
          </div>
          `;
      totalSharedCount++;
      if (count === 5) {
        break;
      }

      count++;
    }
  };
  getSpecifiedDocGenre();

  const getSimScore = async () => {
    const halfScore = await getHalfScore();
    console.log(halfScore);
    const sharedScore = (totalSharedCount / 10) * 0.5;
    const simScore = Math.round((halfScore + sharedScore) * 10000) / 100;
    console.log("totalSharedCount: " + totalSharedCount);
    document.querySelector("#simscore").innerHTML += `
          <div id="simPie"class="pie animate" style="--p:${simScore};--c:#1db954"> ${simScore}%</div>     `;
  };

  return (
    <div className="Compare">
      <button id="logout" onClick={handleClick}>
        Back
      </button>
      <div id="simscore">
        <h1>Similarity Score</h1>
      </div>
      <h1>Top Shared Artists</h1>
      <div className="sharedArtistCon"></div>
      <h1>Top Shared Genres</h1>
      <div className="sharedGenreCon"></div>
    </div>
  );
};
export default Compare;
