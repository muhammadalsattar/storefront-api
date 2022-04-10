import supertest from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../app.js";
import {setupDatabase, userOne, productOne, orderProductOne, orderOne} from "./fixtures/setup.js";
dotenv.config();
beforeEach(async () => {
    await setupDatabase();
});

describe("Service router", () => {
    it("should show cart", async () => {
        const token = jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string);
        const response = await supertest(app)
            .get("/cart")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe(productOne.name);
        expect(response.body[0].price).toBe(String(productOne.price));
        expect(response.body[0].quantity).toBe(String(orderProductOne.quantity));
    });
    it("should purchase", async () => {
        const token = jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string);
        const response = await supertest(app)
            .post("/purchase")
            .set("Authorization", `Bearer ${token}`)
            .send({
                product_id: productOne.id,
                quantity: orderProductOne.quantity,
            })
            .expect(200);
            expect(response.body).toEqual([{...orderProductOne, id: 1}]);
    });
    it("should show order", async () => {
        const token = jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string);
        const response = await supertest(app)
            .get("/orders/order/" + orderOne.id)
            .set("Authorization", `Bearer ${token}`)
            .expect(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].name).toBe(productOne.name);
            expect(response.body[0].price).toBe(String(productOne.price));
            expect(response.body[0].quantity).toBe(String(orderProductOne.quantity));
    });
});

