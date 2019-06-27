import express from "express";
import bodyParser from "body-parser";
import nocache from "nocache";

let server = express();
server.use(nocache());

server.get("/api/hello", async (req, res, next) => {
  try {
    res.send({ hello: "world" });
  } catch (e) {
    next(e);
  }
});

server.post("/api/hello", bodyParser.json(), async (req, res, next) => {
  try {
    res.send({ hello: "world", body: req.body });
  } catch (e) {
    next(e);
  }
});

const SERVER_PORT = process.env.PORT || 8080;
server.listen(SERVER_PORT, () =>
  console.log(`Server ready on http://localhost:${SERVER_PORT}/`)
);
