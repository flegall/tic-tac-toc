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
  it("should allow a move from player 2", async () => {
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 0] }
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
        board: [["2", null, null], [null, null, null], [null, null, null]]
      });
    }
  });

  it("should allow a move from player 1", async () => {
    // Relaunch player 2 move
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 0] }
      });
      expect(response.statusCode).toBe(200);
      expect(body).toEqual({});
    }

    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [0, 0] }
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
        error: {
          playerId: "1",
          message: "CANNOT_PLAY_HERE"
        },
        board: [["2", null, null], [null, null, null], [null, null, null]]
      });
    }
  });

  it("Player 2 should win game with horizontal line", async () => {
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 0] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [1, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [2, 2] }
      });
    }
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 2] }
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
        status: "WAITING_FOR_PLAYERS",
        lastGameResult: {
          player1: "1",
          player2: "2",
          board: [["2", "2", "2"], [null, "1", null], [null, null, "1"]],
          winner: "2"
        }
      });
    }
  });

  it("Player 2 should win game with vertical line", async () => {
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 0] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [0, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [1, 0] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [1, 1] }
      });
    }
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [2, 0] }
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
        status: "WAITING_FOR_PLAYERS",
        lastGameResult: {
          player1: "1",
          player2: "2",
          board: [["2", "1", null], ["2", "1", null], ["2", null, null]],
          winner: "2"
        }
      });
    }
  });

  it("Player 2 should win game with diagonal line from left to right", async () => {
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 0] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [0, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [1, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [1, 2] }
      });
    }
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [2, 2] }
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
        status: "WAITING_FOR_PLAYERS",
        lastGameResult: {
          player1: "1",
          player2: "2",
          board: [["2", "1", null], [null, "2", "1"], [null, null, "2"]],
          winner: "2"
        }
      });
    }
  });

  it("Player 2 should win game with diagonal line from right to left", async () => {
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 2] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [0, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [1, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [1, 2] }
      });
    }
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [2, 0] }
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
        status: "WAITING_FOR_PLAYERS",
        lastGameResult: {
          player1: "1",
          player2: "2",
          board: [[null, "1", "2"], [null, "2", "1"], ["2", null, null]],
          winner: "2"
        }
      });
    }
  });

  it("Match should be null", async () => {
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 0] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [0, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [0, 2] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [1, 0] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [1, 1] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [2, 0] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [1, 2] }
      });
    }
    {
      await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "1", position: [2, 2] }
      });
    }
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/play`,
        body: { playerId: "2", position: [2, 1] }
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
        status: "WAITING_FOR_PLAYERS",
        lastGameResult: {
          player1: "1",
          player2: "2",
          board: [["2", "1", "2"], ["1", "2", "2"], ["1", "2", "1"]],
          winner: null
        }
      });
    }
  });
});
