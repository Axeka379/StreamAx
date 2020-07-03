import React, { useState } from "react";
import { Input, Button } from "antd";
let webS = new window.WebSocket("wss://jstrands.ddns.net:4000");
const WsChat = () => {
  const { Search } = Input;
  const [chatArray, setChatMessage] = useState(["Welcome to the chat"]);
  const testArray = ["testing1111"];

  webS.onopen = () => {
    console.log("connected!");
  };
  webS.onclose = () => {
    console.log("connection closed");
  };

  webS.onmessage = (event) => {
    let data = JSON.parse(event.data);

    setChatMessage((oldArray) => [
      ...oldArray,
      <p style={{ fontSize: 20 }}>{data.message}</p>,
    ]);
  };
  return (
    <div>
      <div
        style={{
          width: 300,
          height: 600,
          backgroundColor: "rgb(50,50,50)",
          position: "absolute",
          top: 200,
          right: 50,
          border: " 1px solid rgb(50,100,150)",
          overflow: "scroll",
          textAlign: "start",
        }}
      >
        <div id="chatContent">{chatArray}</div>
      </div>
      <Search
        placeholder="Type something"
        onSearch={(value) => webS.send(value)}
        enterButton="Meow"
        style={{ width: 300, position: "absolute", top: 800, right: 50 }}
      />
    </div>
  );
};

export default WsChat;
