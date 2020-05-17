import React, { useEffect, useState } from "react";
import Peer from "simple-peer";
import { Select } from "antd";
const { Option } = Select;

// https://github.com/lazorfuzz/liowebrtc/
const PeerVoiceChat = () => {
  let antdSelect;
  //let inputDevices = await navigator.mediaDevices.enumerateDevices();
  const [audioOptions, setAudioOptions] = useState();

  antdSelect = (
    <div>
      <Select defaultActiveFirstOption style={{ width: 220 }}>
        {audioOptions}
      </Select>
    </div>
  );
  useEffect(() => {
    const audioInputSelect2 = document.querySelector("select#audioSource");
    (async () => {
      let inputDevices = await navigator.mediaDevices.enumerateDevices();

      setAudioOptions(
        inputDevices.map((listedDevice, i) => {
          console.log(listedDevice);
          if (listedDevice.kind === "audioinput")
            return (
              <Option key={i} value={listedDevice.value}>
                {listedDevice.label || `Input Device - ${i}`}
              </Option>
            );
        })
      );

      for (let i = 0; i < inputDevices.length; i++) {
        let option = document.createElement("option");
        option.id = i;
        option.value = inputDevices[i].deviceId;

        option.text = inputDevices[i].label || `Input Device - ${i}`;
        if (inputDevices[i].kind === "audioinput") {
          audioInputSelect2.appendChild(option);
        }
      }
    })();

    let audioStream;
    document.querySelector("#start").onclick = (event) => {
      console.log("click");
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId: audioInputSelect2.value,
          },
        })
        .then(function (stream) {
          audioStream = stream;
          let webS = new WebSocket("wss://grotbrotvoice.herokuapp.com");

          let myId = Math.round((Math.random() * 100) / Math.random());
          console.log(myId);

          webS.onopen = () => {
            webS.send(JSON.stringify({ type: "hello", id: myId }));
            console.log("connected!");
          };

          let peerConnections = {};

          webS.onmessage = (event) => {
            let data = JSON.parse(event.data);
            if (data.receiver === myId) {
              console.log(data);
              if (data.type === "ack" && data.receiver === myId) {
                let newInitPeer = new Peer({
                  initiator: true,
                  trickle: false,
                  stream: audioStream,
                });
                newInitPeer.on("signal", function (signalData) {
                  // send this signaling data to peer2 somehow
                  // webS.send(JSON.stringify({ acceptedReciever: '#2', conn: data }))
                  console.log("signalINIT");
                  peerConnections[data.id] = newInitPeer;
                  webS.send(
                    JSON.stringify({
                      receiver: data.id,
                      type: "newOffer",
                      conn: signalData,
                      from: myId,
                    })
                  );
                });
                newInitPeer.on("connect", function () {
                  newInitPeer.send("hi from:" + myId);
                  console.log("CONNECTED");
                });
                newInitPeer.on("data", function (data) {
                  console.log("got a message: " + data);
                });
                newInitPeer.on("stream", function (stream) {
                  document
                    .querySelector("#peerContainer")
                    .insertAdjacentHTML(
                      "beforeend",
                      `<p>user id:${data.id}</p>`
                    );

                  console.log("got initatior stream: ");
                  let newInitRemoteVideo = document.createElement("audio");
                  //newInitRemoteVideo.stre;
                  newInitRemoteVideo.controls = "controls";
                  document
                    .querySelector("#peerContainer")
                    .appendChild(newInitRemoteVideo);
                  newInitRemoteVideo.srcObject = stream;
                  newInitRemoteVideo.play();
                });
              }
              if (data.type === "newOffer" && data.receiver === myId) {
                console.log("new offer");
                peerConnections[data.from].signal(data.conn);
                setTimeout(() => {
                  peerConnections[data.from].send("hi from me:" + myId);
                }, 9000);
              }
            }
            // console.log(event.data)
            if (data.type === "newAnswer" && data.receiver === myId) {
              console.log("new answer!");
              console.log(peerConnections);
              peerConnections[data.from].signal(data.conn);
            }
            if (data.type === "hello" && data.id !== myId) {
              let newId = data.id;
              let newJoin = new Peer({
                initiator: false,
                trickle: false,
                stream: audioStream,
              });
              newJoin.on("signal", function (signalData) {
                console.log("newjoin signal");

                webS.send(
                  JSON.stringify({
                    receiver: newId,
                    conn: signalData,
                    type: "newAnswer",
                    from: myId,
                  })
                );
              });
              newJoin.on("connect", function () {
                console.log("CONNECTED");
                newJoin.send("hi from" + myId);
              });
              newJoin.on("data", function (data) {
                console.log("got a message: " + data);
              });
              newJoin.on("stream", function (stream) {
                document
                  .querySelector("#peerContainer")
                  .insertAdjacentHTML("beforeend", `<p>user id:${data.id}</p>`);

                let newRemoteAudioStream = document.createElement("audio");
                newRemoteAudioStream.controls = "controls";
                document
                  .querySelector("#peerContainer")
                  .appendChild(newRemoteAudioStream);

                newRemoteAudioStream.srcObject = stream;
                newRemoteAudioStream.play();
                console.log("got stream");
              });
              webS.send(
                JSON.stringify({ type: "ack", id: myId, receiver: newId })
              );
              if (data.id) {
                peerConnections[newId] = newJoin;
              }

              console.log(peerConnections);
            }
          };
        });
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 130,
        left: 100,
        width: "400px",
        height: "1200px",
        color: "white",
        textAlign: "left",
      }}
    >
      <label style={{ fontSize: 22 }} htmlFor="audioSource">
        Input source:{" "}
      </label>
      <select id="audioSource"></select>
      {antdSelect}
      <span id="sourceinfo" className="hiddeninfo">
        {" "}
      </span>

      <video id="localvideo"></video>
      <audio id="localaudio"></audio>
      <button
        style={{
          backgroundColor: "rgb(255,50,0,0)",
          width: 200,
          height: 50,
          fontSize: 20,
        }}
        id="start"
      >
        Join PeerChat
      </button>
      <div id="idContainer"></div>
      <div style={{ height: 500 }} id="peerContainer"></div>
    </div>
  );
};

export default PeerVoiceChat;
