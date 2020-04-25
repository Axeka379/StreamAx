import React from "react";
import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { Input } from "antd";
import LoginForm from "./LoginForm";

function Maincontent() {
  const [serverMessage, setMessage] = useState({ message: "Loading" });
  const { Search } = Input;

  useEffect(() => {
    (async () => {
      const result = await fetch("https://757adc29.ngrok.io/");
      const json = await result.json();
      console.log(json);
      console.log(await result);
      setMessage(json);
    })();
  }, []);
  return (
    <main>
      <div className="centerContentFlex">
        <img src={logo} className="App-logo" alt="logo" />

        <p className="">{serverMessage.message}</p>

        <Search
          placeholder="write something"
          onSearch={(value) =>
            (document.querySelector(
              "#search"
            ).innerText = `${value.toUpperCase()}`)
          }
          style={{ width: 400 }}
        />
        <div className="textContent">
          <span style={{ display: "inline" }}>StrandBurst är </span>
          <span className="ani" id="search"></span>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
export default Maincontent;
