import React from "react"
import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { Input } from "antd";

function Maincontent() {

  const [serverMessage, setMessage] = useState({ message: "Loading" });
  const { Search } = Input;

  useEffect(() => {
    (async () => {
      const result = await fetch("https://jstrands.ddns.net:4000");
      const json = await result.json();
      console.log(json);
      console.log(await result)
      setMessage(json);
    })();
  }, []);
  return (
    <main>
      <div className="centerContentFlex">
        <img src={logo} className="App-logo" alt="logo" />

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
  )

}
export default Maincontent