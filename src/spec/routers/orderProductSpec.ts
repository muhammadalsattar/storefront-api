import supertest from "supertest";
import app from "../../app.js";
import {setupDatabase, orderProductOne} from "../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});

describe("orderProductRouter", () => {
    it("GET /orderproduct/order/:orderId", async () => {
        const response = await supertest(app).get(`/orderproduct/order/${orderProductOne.order_id}`);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(orderProductOne.id);
        expect(response.body[0].order_id).toBe(orderProductOne.order_id);
        expect(response.body[0].product_id).toBe(orderProductOne.product_id);
        expect(response.body[0].quantity).toBe(orderProductOne.quantity);
    });
    it("GET /orderproduct/product/:productId", async () => {
        const response = await supertest(app).get(`/orderproduct/product/${orderProductOne.product_id}`);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(orderProductOne.id);
        expect(response.body[0].order_id).toBe(orderProductOne.order_id);
        expect(response.body[0].product_id).toBe(orderProductOne.product_id);
        expect(response.body[0].quantity).toBe(orderProductOne.quantity);
    });
});