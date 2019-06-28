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
  let color = "#ecf0f1";

  if (stateApp.lastGameResult) {
    if (stateApp.lastGameResult.winner === null) {
      msg = "Match nul";
    } else if (stateApp.lastGameResult.winner === playerId) {
      color = "#2ecc71";
      msg = "Vous avez gagné";
    } else {
      color = "#e74c3c";
      msg = "Vous avez perdu";
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "30px" }}>Tic Tac Toc</div>
      <br />
      <div style={{ color }}>{msg}</div>
      Pour demarrer la partie appuyer sur OK
    </div>
  );
};

export default Home;
