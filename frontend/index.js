import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import uuidv4 from "uuid/v4";

import "r7extlib";

import Home from "./pages/Home";
import Waiting from "./pages/Waiting";
import Game from "./pages/Game";
import Error from "./pages/Error";

import "./style.scss";

export const io = socketIo("//:8081");
export let playerId = uuidv4();

const initIdPlayer = () => {
  window.R7("getCas", (err, result) => {
    if (!err && "casparams" in result) {
      playerId = result.casparams.msd || uuidv4();
    }
  });
};

const EventState = () => {
  initIdPlayer();
  const [stateApp, setStateApp] = useState({
    status: "WAITING_FOR_PLAYERS"
  });

  console.log({ stateApp });

  useEffect(() => {
    io.on("gameState", event => {
      console.log("=> event : ", event);
      setStateApp(event);
    });
  }, []);

  switch (stateApp.status) {
    case "WAITING_FOR_PLAYERS":
      return <Home stateApp={stateApp} />;
    case "WAITING_FOR_OPPONENT":
      return <Waiting stateApp={stateApp} />;
    case "ONGOING":
      return <Game stateApp={stateApp} />;
    default:
      return <Error />;
  }
};

const App = () => (
  <div className="App">
    <EventState />
  </div>
);

const rootElement = document.getElementById("root");

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(<App />, rootElement);
} else {
  window.R7.ready(() => {
    ReactDOM.render(<App />, rootElement);
  });
}

io.emit("reset");

// setTimeout(() => {
//   io.emit("startGame", { playerId: "1" });
// }, 2000);
// setTimeout(() => {
//   io.emit("startGame", { playerId: "2" });
// }, 3000);
