import React from "react";
import { Menu} from "antd";
import { Typography} from "antd";

const { Title} = Typography;
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
          
        </div>
      </header>
)


}


export default Header