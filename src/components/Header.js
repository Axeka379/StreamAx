import React from "react";
import { Menu } from "antd";
import { Typography, Button } from "antd";
import Cookies from "js-cookie";

const { Title } = Typography;
const { SubMenu } = Menu;

function Header() {
  return (
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
            <Title style={{ marginBottom: "5px", color: "rgb(100 255 10)" }}>
              StreamJs
            </Title>
          </Menu.Item>
          <Menu.Item key=""> Testy texty boi</Menu.Item>

          <SubMenu title={<> Drop</>}>
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Blörp</Menu.Item>
              <Menu.Item key="setting:2">SimQn</Menu.Item>
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

          {Cookies.get("username") ? (
            <Menu.Item style={{ marginLeft: 50 }}>
              <span style={{}}>Logged in as: {Cookies.get("username")}</span>
              <Button
                style={{ marginLeft: 20 }}
                onClick={logout}
                type="primary"
              >
                Logout
              </Button>
            </Menu.Item>
          ) : null}
        </Menu>
      </div>
    </header>
  );
}

function logout() {
  Cookies.remove("access_token");
  Cookies.remove("username");
  window.location.reload();
}

export default Header;
