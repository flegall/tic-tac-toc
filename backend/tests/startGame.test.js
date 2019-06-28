import { requestApi } from "./request-api-utils";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

describe("start game", () => {
  beforeEach(async () => {
    const { response, body } = await requestApi({
      method: "POST",
      url: `${BACKEND_URL}/api/reset`
    });
  });
  it("should start a game from WAITING_FOR_PLAYERS for 1st player", async () => {
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/startGame`,
        body: { playerId: "1" }
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({});
    }

    {
      const { response, body } = await requestApi({
        method: "GET",
        url: `${BACKEND_URL}/api/state`
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({ status: "WAITING_FOR_OPPONENT", player1: "1" });
    }
  });

  it("should start a game from WAITING_FOR_PLAYERS for 2nd player", async () => {
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/startGame`,
        body: { playerId: "1" }
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({});
    }

    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/startGame`,
        body: { playerId: "2" }
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({});
    }

    {
      const { response, body } = await requestApi({
        method: "GET",
        url: `${BACKEND_URL}/api/state`
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({
        status: "ONGOING",
        playerTurn: "2",
        player1: "1",
        player2: "2",
        board: [[null, null, null], [null, null, null], [null, null, null]]
      });
    }
  });

  it("should not start a game from WAITING_FOR_PLAYERS for 3rd player", async () => {
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/startGame`,
        body: { playerId: "1" }
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({});
    }

    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/startGame`,
        body: { playerId: "2" }
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({});
    }

    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/startGame`,
        body: { playerId: "3" }
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({});
    }

    {
      const { response, body } = await requestApi({
        method: "GET",
        url: `${BACKEND_URL}/api/state`
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({
        status: "ONGOING",
        playerTurn: "2",
        player1: "1",
        player2: "2",
        board: [[null, null, null], [null, null, null], [null, null, null]]
      });
    }
  });
});
