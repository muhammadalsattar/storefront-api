import request from "supertest";
import app from "../server.js"

describe("App router", () => {
    it("should return 200", async () => {
        const response = await request(app).get("/cart");
        expect(response.status).toBe(401);
    });
});