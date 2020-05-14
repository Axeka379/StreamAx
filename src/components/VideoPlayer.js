import React from 'react';
import videojs from 'video.js'
import eme from 'videojs-contrib-eme'
import "video.js/dist/video-js.css";
//var eme = videojs.getPlugin('videojs-contrib-eme')

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    videojs.registerPlugin('videojs-contrib-eme', eme);
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
    this.player.eme();
    this.player.src({
      //src: 'https://cloud.comhem.se/opin/io/downloadPublic/jc000114826/e33bafef3d294eb29c5b14ddd5669195/@e33bafef3d294eb29c5b14ddd5669195',
      src: 'https://jstrands.ddns.net:4000/videos',
      type: 'video/webm',
      //data-setup:'{ "techOrder": ["vlc"] }',
      keySystems: {
        'com.widevine.alpha': 'https:jstrands.ddns.net:6000'
      }
      });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js"></video>
        </div>
      </div>
    )
  }
}

/*
 plugins: {
            eme: {
              keySystems: {
                'org.w3.clearkey': {
                  audioContentType: 'audio/x-matroska; codecs="vorbis"',
                  videoContentType: 'video/x-matroska; codecs="theora"',
                  getLicense: (emeOptions, keyMessage, callback) => {
                    // Parse the clearkey license request.
                    let request = JSON.parse(new TextDecoder().decode(keyMessage));
                    // We only know one key, so there should only be one key ID.
                    // A real license server could easily serve multiple keys.
                    console.assert(request.kids.length === 1);
  
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
            }
          }
          */