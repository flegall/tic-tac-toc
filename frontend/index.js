import ReactDOM from "react-dom";
import React from "react";
import socketIo from "socket.io-client";

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

const io = socketIo("http://localhost:8081");
setTimeout(() => {
  io.emit("reset");
}, 5000);

setTimeout(() => {
  io.emit("startGame", { playerId: "1" });
}, 8000);
setTimeout(() => {
  io.emit("startGame", { playerId: "2" });
}, 11000);
io.on("gameState", event => {
  console.log("gameState changed", event);
});
