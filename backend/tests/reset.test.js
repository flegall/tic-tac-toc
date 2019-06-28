import { requestApi } from "./request-api-utils";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

describe("reset state", () => {
  it("get should work", async () => {
    {
      const { response, body } = await requestApi({
        method: "POST",
        url: `${BACKEND_URL}/api/reset`
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
        status: "WAITING_FOR_PLAYERS"
      });
    }
  });
});
