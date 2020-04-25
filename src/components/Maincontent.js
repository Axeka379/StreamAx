import React from "react";
import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";
import ReactPlayer from "react-player"

function Maincontent() {
  const [serverMessage, setMessage] = useState({ message: "Loading" });
  const { Search } = Input;

  useEffect(() => {
    (async () => {

      if (Cookies.get("access_token")) {
        console.log("authed");
        var bearer = "Bearer " + Cookies.get("access_token");
        const result = await fetch("https://jstrands.ddns.net/:4000", {
          headers: {
            Authorization: bearer,
          },
        });
        const json = await result.json();

        setMessage(json);
      } else {
        setMessage({ message: "Login to access content" });
      }
    })();
  }, []);

  if (Cookies.get("access_token")) {
    return (
      <main>
        <div className="centerContentFlex">
          <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' playing />

          <p className="">{serverMessage.message}</p>

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
    return (
      <main>
        <div style={{ marginTop: "70px" }}>
          <div className="centerContentFlex">
            <p className="">{serverMessage.message}</p>

            <div className="textContent">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default Maincontent;
