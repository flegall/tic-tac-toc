import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { io, playerId as toto } from "../..";

const onEnterKeydown = ({ key }) => {
  switch (key) {
    case "Enter":
      io.emit("startGame", { playerId: toto });
      break;
  }
};

const onEnterR7 = event => {
  io.emit("startGame", { playerId: toto });
};

const Home = ({ stateApp, playerId }) => {
  useEffect(() => {
    document.addEventListener("keydown", onEnterKeydown);
    window.R7.grabKey("Enter", onEnterR7);

    return () => {
      document.removeEventListener("keydown", onEnterKeydown);
    };
  }, []);

  let msg = "";

  if (stateApp.lastGameResult) {
    if (stateApp.lastGameResult.winner === null) {
      msg = "Match nul";
    } else if (stateApp.lastGameResult.winner === playerId) {
      msg = "Vous avez gagné";
    } else {
      msg = "Vous avez perdu";
    }
  }

  return (
    <div>
      Tic Tac Toc
      <br />
      {msg && <div>{msg}</div>}
      Pour demarrer la partie appuyer sur OK
    </div>
  );
};

export default Home;
