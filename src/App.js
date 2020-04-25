import React from "react";

import Header from "./components/Header";
import Maincontent from "./components/Maincontent";
import "./App.css";

const defaultGlobalState = {
  num: 0,
  text: "foo",
  bool: false,
  isLoggedIn: false,
};
const globalStateContext = React.createContext(defaultGlobalState);
const dispatchStateContext = React.createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    defaultGlobalState
  );
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext),
];

function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <Header />
        <Maincontent />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
