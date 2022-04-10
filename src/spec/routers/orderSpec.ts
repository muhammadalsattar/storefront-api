import supertest from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../../app.js";
import {setupDatabase, orderOne, userOne} from "../fixtures/setup.js";
dotenv.config();
beforeEach(async () => {
    await setupDatabase();
});

describe("Order router", () => {
    it("should get orders by userId", async () => {
        const response = await supertest(app).get(`/orders/${orderOne.user_id}`).set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([orderOne]);
    });
    it("should fail get orders for unauthenticated users", async () => {
        const response = await supertest(app).get(`/orders/${orderOne.user_id}`);
        expect(response.status).toBe(401);
    });
    it("should get orders by status", async () => {
        const response = await supertest(app).get(`/orders/${orderOne.user_id}/${orderOne.status}`).set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([orderOne]);
    });
    it("should complete order", async () => {
        const response = await supertest(app).post(`/checkout/${orderOne.id}`).set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({...orderOne, status: "completed"});
    });

});