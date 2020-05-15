import React from "react";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import ReactHLS from 'react-hls-player';
import videojs from 'video.js'
import eme from 'videojs-contrib-eme'
import "video.js/dist/video-js.css";
//import VideoPlayer from './VideoPlayer.js'
//import eme from 'videojs-contrib-eme'
//import ShakaPlayer from 'shaka-player-react';
//import player from 'video.js'
//var request = require('request')
/*var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'rickandmorty';
*/
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
      //var decrypt = crypto.createDecipher(algorithm, password)
      
      //request('https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/25df3bf6963f4468b8d0977a4b7d0aec').pipe(decrypt).pipe(vid);
      //https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/e33bafef3d294eb29c5b14ddd5669195/@e33bafef3d294eb29c5b14ddd5669195
      
      //fetch('https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/25df3bf6963f4468b8d0977a4b7d0aec', {mode: 'no-cors'}, res => res.pipe(decrypt).pipe(fs.createWriteStream(vid.srcObject)));
         //
      const videoJsOptions = {
        //id: 'VIDYA',
        //autoplay: true,
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
            <video 
              crossOrigin="anonymous" 
              id="videojs-contrib-eme-player" 
              className="video-js vjs-default-skin" 
              //type='video/x-matroska; codecs="theora, vorbis"' 
              controls 
              data-setup='{"plugins": {"eme": {}}}'>
            </video>
            
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
          
        const KEY = new Uint8Array([
         //HIDDEN KEY LOL
        ]);
  
        let player = window.player = videojs('videojs-contrib-eme-player');
  
        // Convert Uint8Array into base64 using base64url alphabet, without padding.
        let toBase64 = (u8arr) => {
          return btoa(String.fromCharCode.apply(null, u8arr)).
            replace(/\+/g, '-').replace(/\//g, '_').replace(/=*$/, '');
        }
  
        player.src({
     //          src: 'https://cors-anywhere.herokuapp.com/https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/33fd9512b75540bfa960920b0b4c05eb',
     // WEBM src: 'https://cors-anywhere.herokuapp.com/https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/02a27676d0e24cad82fd5d1cad7ab395',

          src: 'https://cors-anywhere.herokuapp.com/https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/33fd9512b75540bfa960920b0b4c05eb',
          type: 'video/mp4',
      
          keySystems: {
            'org.w3.clearkey': {
              audioContentType: 'audio/webm; codecs="vorbis"',
          videoContentType: 'video/webm; codecs="vp9"',
              getLicense: (emeOptions, keyMessage, callback) => {
                // Parse the clearkey license request.
                let request = JSON.parse(new TextDecoder().decode(keyMessage));
                // We only know one key, so there should only be one key ID.
                // A real license server could easily serve multiple keys.
                 
                let keyObj = {
                  kty: 'oct',
                  alg: 'A128KW',
                  kid: request.kids[0],
                  k: toBase64(KEY)
                };
  
                console.log('Key object:', keyObj);
  
                callback(null, new TextEncoder().encode(JSON.stringify({
                  keys: [keyObj]
                })));
              }
            }
          }
        });
        
                  
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
