import request from "supertest";
import app from "../app.js"

describe("App router", () => {
    it("should return 200", async () => {
        const response = await request(app).get("/cart");
        expect(response.status).toBe(401);
    });
});