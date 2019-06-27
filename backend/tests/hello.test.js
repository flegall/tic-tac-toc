import { requestApi } from "./request-api-utils";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

describe("hello", () => {
  it("get should work", async () => {
    const { response, body } = await requestApi({
      method: "GET",
      url: `${BACKEND_URL}/api/hello`
    });
    expect(response.statusCode).toBe(200);
    expect(body).toEqual({ hello: "world" });
  });

  it("post should work", async () => {
    const { response, body } = await requestApi({
      method: "POST",
      url: `${BACKEND_URL}/api/hello`,
      body: { fckYou: true }
    });
    expect(response.statusCode).toBe(200);
    expect(body).toEqual({ hello: "world", body: { fckYou: true } });
  });
});
