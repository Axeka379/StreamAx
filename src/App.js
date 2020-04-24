import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [serverMessage, setMessage] = useState({ message: "Loading" });

  useEffect(() => {
    (async () => {
      const result = await fetch("http://localhost:4000");
      const json = await result.json();
      console.log(json);
      //console.log(await result)
      setMessage(json);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <p>{serverMessage.message}</p>
        </a>
      </header>
    </div>
  );
}

export default App;
