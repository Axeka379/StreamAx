import React from "react";

import Header from "./components/Header";
import Maincontent from "./components/Maincontent";
import "./App.css";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Yahallo from "./features/yahallo/Yahallo";

function App() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />

        <Route exact path={"/"}>
          <Maincontent />
        </Route>

        <Route exact path={"/yahallo"}>
          <Yahallo />
        </Route>

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
