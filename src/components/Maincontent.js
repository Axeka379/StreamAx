import React from "react";
import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";

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
              <ReactPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                playing
              />

              <Search
                placeholder="Type something"
                onSearch={(value) =>
                  (document.querySelector(
                    "#search"
                  ).innerText = `${value.toUpperCase()}`)
                }
                style={{ width: 400 }}
              />
              <div className="textContent">
                <span style={{ display: "inline" }}>SimQn är </span>
                <span className="ani" id="search"></span>
              </div>
            </div>
          </main>
        );
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
