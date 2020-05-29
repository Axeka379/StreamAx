import React from "react";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";

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
       
      if (json.status === "success") {
        setContent(
          <main>
            <div className="centerContentFlex">
            <video 
              crossOrigin="anonymous" 
              //id="videojs-contrib-eme-player" 
              //className="video-js vjs-default-skin" 
              //src='https://jstrands.ddns.net:5000/live/streamy/index.mpd'
              type='video/mp4; codecs="libvorbis"' 
              controls 
              autoPlay
              //data-setup='{"plugins": {"eme": {}}}'
              >
            </video>
         
                 <div className="textContent">
                <span style={{ display: "inline" }}>SimQn är </span>
                <span className="ani" id="search"></span>
              </div>
            </div>
          </main>
        );
          
        const KEY = new Uint8Array([
          0x7f, 0x16, 0x64, 0x29, 0xe5, 0xa7, 0x31, 0x5e, 0xa0, 0xf3, 0xb3, 0xd6, 0x83, 0x57, 0x9c, 0x0d
        ]);
                
        let toBase64 = (u8arr) => {
          return btoa(String.fromCharCode.apply(null, u8arr)).
            replace(/\+/g, '-').replace(/\//g, '_').replace(/=*$/, '');
        }
  
               var config = [{
          initDataTypes: ['webm'],
          videoCapabilities: [{
            contentType: 'video/webm; codecs="vp9"'
          }]
        }];
        
        var video = document.querySelector('video');
        video.addEventListener('encrypted', handleEncrypted, false);
        
        navigator.requestMediaKeySystemAccess('org.w3.clearkey', config).then(
          function(keySystemAccess) {
            return keySystemAccess.createMediaKeys();
          }
        ).then(
          function(createdMediaKeys) {
            return video.setMediaKeys(createdMediaKeys);
          }
        ).catch(
          function(error) {
            console.error('Failed to set up MediaKeys', error);
          }
        );
        
        function handleEncrypted(event) {
          var session = video.mediaKeys.createSession();
          session.addEventListener('message', handleMessage, false);
          session.generateRequest(event.initDataType, event.initData).catch(
            function(error) {
              console.error('Failed to generate a license request', error);
            }
          );
        }
        
        function handleMessage(event) {
       
          var license = generateLicense(event.message);
        
          var session = event.target;
          session.update(license).catch(
            function(error) {
              console.error('Failed to update the session', error);
            }
          );
        }

        function generateLicense(message) {
          // Parse the clearkey license request.
          var request = JSON.parse(new TextDecoder().decode(message));
          // We only know one key, so there should only be one key ID.
          // A real license server could easily serve multiple keys.
          console.assert(request.kids.length === 1);
        
          var keyObj = {
            kty: 'oct',
            alg: 'A128KW',
            kid: request.kids[0],
            k: toBase64(KEY)
          };
          return new TextEncoder().encode(JSON.stringify({
            keys: [keyObj]
          }));
        }
        //WEBM
        //video.src = "https://jstrands.ddns.net:6699/https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/02a27676d0e24cad82fd5d1cad7ab395"
        video.src='https://jstrands.ddns.net:4000/videos'
        //MP4
        //video.src = "https://jstrands.ddns.net/https://cloud.comhem.se/opin/io/download/sync/@@225:d237517ba5248fc5cdf1e8a7d3961a10?authToken=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQTUJIWk43T0Z0cUhhbDVacGxrQjB4SWRpbWpFXzFrNmE2NGlBTEF4THNBIn0.eyJqdGkiOiI4OGU1NjgyMS00MTdiLTRkNmItOGYzYy1lMGIxZGUwYzNhMTQiLCJleHAiOjE1ODk2MzM1MzQsIm5iZiI6MCwiaWF0IjoxNTg5NjI5OTM0LCJpc3MiOiJodHRwczovL2Nsb3VkLmNvbWhlbS5zZS9hdXRoL3JlYWxtcy9jb21oZW0iLCJzdWIiOiJmOjU1MDEwMzI3LWQzYmEtNDFjNS1hYzRhLWM3NzRlNzk4NTRlODpqYzAwMDExNDgyNiIsInR5cCI6IkJlYXJlciIsImF6cCI6IndlYiIsIm5vbmNlIjoiYjAxZGE1ZWQtNWU4Zi00NjVjLWE2NmYtMjMyYmFkZmMxYzBmIiwiYXV0aF90aW1lIjoxNTg5NjI5OTM0LCJzZXNzaW9uX3N0YXRlIjoiMTQ4MTM1ODAtNTFiYi00OTNkLThjZDMtNTc2ZDNiYTkxMzY2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInNjb3BlIjoib3BlbmlkIGpvdHRhLWRlZmF1bHQiLCJyZWFsbSI6ImNvbWhlbSIsInByZWZlcnJlZF91c2VybmFtZSI6ImpjMDAwMTE0ODI2IiwidXNlcm5hbWUiOiJqYzAwMDExNDgyNiJ9.GbrRAH6JAPOqHsOusQwhMtSNT6j44S721OMXsHTY2Z_xThiZ1DhrBg2UBHbZaq_xaFbVnMnzD9SkplNqqs6K7JkoBFnWxnKtWup4slf7RcZjg6QucpXPYbhVVK845LLVe9HJgQ6q3VuQ3T4VPHR4wCbMkuIFczGBJ-2_P6F2Ej8mzv2U3_B6jgEbI-KHeO27CmHz8mQ4enjz-7_7k28eUlFZKVafhd30MZf9KmBahhT7khxZiaf4X5ZeYfPjHXu4WCZqr9w_GEMijsxf5HPBfQVG8NCQEnDcqsAH2fq3tu7a8WPJuMqjSMoHOKuJ_grn1V9a-uBWJXcPmTKXxElrLw"

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
