import React from "react";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import ReactHLS from 'react-hls-player';
import VideoPlayer from './VideoPlayer.js'
//import eme from 'videojs-contrib-eme'
//import ShakaPlayer from 'shaka-player-react';
//import player from 'video.js'
var request = require('request')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'rickandmorty';
const fs = require('fs');  

function toBase64(u8arr) {
  return btoa(String.fromCharCode.apply(null, u8arr)).
      replace(/\+/g, '-').replace(/\//g, '_').replace(/=*$/, '');
}

function Maincontent() {
  const [serverMessage, setMessage] = useState({ message: "Loading..." });
  const [content, setContent] = useState();
  const { Search } = Input;

  useEffect(() => {
    let json;
    (async () => {
      console.log("authed");
      let bearer = "Bearer " + Cookies.get("access_token");
      const result = await fetch("https://jstrands.ddns.net:4000", {
        headers: {
          Authorization: bearer,
        },
      });

      json = await result.json();
      console.log(json);
      setMessage(json);
      var decrypt = crypto.createDecipher(algorithm, password)
      
      //request('https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/25df3bf6963f4468b8d0977a4b7d0aec').pipe(decrypt).pipe(vid);
      //https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/e33bafef3d294eb29c5b14ddd5669195/@e33bafef3d294eb29c5b14ddd5669195
      
      //fetch('https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/25df3bf6963f4468b8d0977a4b7d0aec', {mode: 'no-cors'}, res => res.pipe(decrypt).pipe(fs.createWriteStream(vid.srcObject)));
      var KEY = new Uint8Array([
        0xeb, 0xdd, 0x62, 0xf1, 0x68, 0x14, 0xd2, 0x7b,
        0x68, 0xef, 0x12, 0x2a, 0xfc, 0xe4, 0xae, 0x3c
      ]);
      //
      const videoJsOptions = {
        id: 'VIDYA',
        autoplay: true,
        controls: true,
        
        /*sources:[{
          src: 'https://jstrands.ddns.net:4000/videos',
          type: 'video/mp4'
        }]*/
        
      }
       
      if (json.status === "success") {
        setContent(
          <main>
            <div className="centerContentFlex">
            <VideoPlayer { ...videoJsOptions }/>
              <video 
                //src="https://jstrands.ddns.net:4000/videos"
                //id="VIDYA"
                //className="video-js"
                //data-setup='{"plugins": {"eme": {}}}'
                //src={"vid.mkv"}
                //type='video/x-matroska; codecs="theora, vorbis"' 
                //autoPlay 
                //controls
              />
                 <div className="textContent">
                <span style={{ display: "inline" }}>SimQn är </span>
                <span className="ani" id="search"></span>
              </div>
            </div>
          </main>
        );
          
  
        
                  
        //var streamy = fetch('https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/e33bafef3d294eb29c5b14ddd5669195/@e33bafef3d294eb29c5b14ddd5669195', {mode: 'no-cors'});
       // request('https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/25df3bf6963f4468b8d0977a4b7d0aec', {
                 // mode: 'no-cors'
               // }).pipe(decrypt).pipe(vid.srcObject);
        //request('https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/e33bafef3d294eb29c5b14ddd5669195/@e33bafef3d294eb29c5b14ddd5669195').pipe(fs.createWriteStream(streamy))
 
      } else {
        setContent(
          <main>
            <div style={{ marginTop: "70px" }}>
              <div className="centerContentFlex">
                <div className="textContent">
                  <LoginForm />
                </div>
              </div>
            </div>
          </main>
        );
      }
    })();
  }, []);

  return (
    <div style={{marginTop: '70px'}}>
      <p className="">{serverMessage.message}</p>
      {content}
    </div>
  );
}
export default Maincontent;
