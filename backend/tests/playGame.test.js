import { requestApi } from "./request-api-utils";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

describe("playGame", () => {
  beforeEach(async () => {
    await requestApi({
      method: "POST",
      url: `${BACKEND_URL}/api/reset`
    });

    await requestApi({
      method: "POST",
      url: `${BACKEND_URL}/api/startGame`,
      body: { playerId: "1" }
    });

    await requestApi({
      method: "POST",
      url: `${BACKEND_URL}/api/startGame`,
      body: { playerId: "2" }
    });
  });
  it("should allow a move from player 2", async () => {});
});
