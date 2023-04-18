# MusicMate

A senior project by Dylan McGoldrick, Izabela Aranda-Dooley, Erika Proctor, and Will Ruskin.  
<p align="center">
  <img src="/musicmate-reactapp/public/musicmate.jpg" width="400">
</p>


This app is not deployed yet on any website.

Dependencies and installation:

npm install firebase  
npm install jquery  
npm install react-chat-engine  
npm install react-router-dom  

Instructions: 
If you want to pick up on this project, or see the functionality, you will need to clone the repo and create a spotify account. Log in to your spotify account and navigate to [Spotify for Developers dashboard](https://developer.spotify.com/dashboard). There you can create a web app, and you will be given a CLIENT ID. Then in the top of the Login.js file, replace the current CLIENT ID with your own. This will allow you to retrieve your own personal data. 

Next you will need to create a firebase app and go to firestore database. Change the permissions on your database so that you can read and write to it. Once you have your own firebase apiKey, you want to keep it secret through a .env file, so create a .env file in your root directory and use the format REACT_APP_FB_API_KEY=*your api key here*. 

Once you have done these things, you will be good to go. If you want to add users other than your account to your spotify app you will need to add them by email address in the dashboard. 

