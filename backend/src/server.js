import express from "express";
import nocache from "nocache";
import cors from "cors";

import { getState, startGame, resetState } from "./game";

let server = express();
server.use(nocache());
server.use(express.json());
server.use(cors());

server.get("/api/hello", async (req, res, next) => {
  try {
    res.send({ hello: "world" });
  } catch (e) {
    next(e);
  }
});

server.post("/api/hello", async (req, res, next) => {
  try {
    res.send({ hello: "world", body: req.body });
  } catch (e) {
    next(e);
  }
});

server.post("/api/reset", (req, res, next) => {
  try {
    resetState();
    res.status(200).send({});
  } catch (e) {
    next(e);
  }
});

server.get("/api/state", (req, res, next) => {
  try {
    res.status(200).send(getState());
  } catch (e) {
    next(e);
  }
});

server.post("/api/startGame", (req, res, next) => {
  try {
    startGame(req.body);
    res.status(200).send({});
  } catch (e) {
    next(e);
  }
});

const SERVER_PORT = process.env.PORT || 8080;
server.listen(SERVER_PORT, () =>
  console.log(`Server ready on http://localhost:${SERVER_PORT}/`)
);
