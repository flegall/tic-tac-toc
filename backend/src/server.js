import express from "express";
import nocache from "nocache";
import cors from "cors";
import socketIo from "socket.io";
import http from "http";

import { getState, startGame, resetState } from "./game";

let app = express();
const server = http.createServer(app);

const io = socketIo(8081);
io.on("connection", socket => {
  socket.emit("gameState", getState());

  socket.on("reset", () => {
    resetState();
    io.emit("gameState", getState());
  });

  socket.on("startGame", body => {
    startGame(body);
    io.emit("gameState", getState());
  });
});

app.use(nocache());
app.use(express.json());
app.use(cors());

app.get("/api/hello", async (req, res, next) => {
  try {
    res.send({ hello: "world" });
  } catch (e) {
    next(e);
  }
});

app.post("/api/hello", async (req, res, next) => {
  try {
    res.send({ hello: "world", body: req.body });
  } catch (e) {
    next(e);
  }
});

app.post("/api/reset", (req, res, next) => {
  try {
    resetState();
    io.emit("gameState", getState());
    res.status(200).send({});
  } catch (e) {
    next(e);
  }
});

app.get("/api/state", (req, res, next) => {
  try {
    res.status(200).send(getState());
  } catch (e) {
    next(e);
  }
});

app.post("/api/startGame", (req, res, next) => {
  try {
    startGame(req.body);
    io.emit("gameState", getState());
    res.status(200).send({});
  } catch (e) {
    next(e);
  }
});

const SERVER_PORT = process.env.PORT || 8080;
server.listen(SERVER_PORT, () =>
  console.log(`Server ready on http://localhost:${SERVER_PORT}/`)
);
