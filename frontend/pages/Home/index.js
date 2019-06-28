import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { io, playerId } from "../..";

const onEnterKeydown = ({ key }) => {
  switch (key) {
    case "Enter":
      io.emit("startGame", { playerId });
      break;
  }
};

const onEnterR7 = event => {
  io.emit("startGame", { playerId });
};

const Home = () => {
  useEffect(() => {
    document.addEventListener("keydown", onEnterKeydown);
    window.R7.grabKey("Enter", onEnterR7);

    return () => {
      document.removeEventListener("keydown", onEnterKeydown);
    };
  }, []);

  return (
    <div>
      Tic Tac Toc
      <br />
      Pour demarrer la partie appuyer sur OK
    </div>
  );
};

export default Home;
