import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Menu, Input } from "antd";
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;
const { SubMenu } = Menu;
const { Search } = Input;
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
        <div className="siteContent">
          <Menu
            style={{
              backgroundColor: "#132744",
              color: "white",
              minWidth: "1500px",
            }}
            mode="horizontal"
          >
            <Menu.Item key="siteName">
              <Title style={{ marginBottom: "5px", color: "rgb(255,255,255)" }}>
                StreamAx
              </Title>
            </Menu.Item>
            <Menu.Item key=""> StrandBurst är noob</Menu.Item>

            <SubMenu title={<> Drop</>}>
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Blörp</Menu.Item>
                <Menu.Item key="setting:2">Blörp</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Blörp</Menu.Item>
                <Menu.Item key="setting:4">Blörp</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                href
              </a>
            </Menu.Item>
          </Menu>
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
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
