var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../app.js";
import { setupDatabase, userOne, productOne, orderProductOne, orderOne } from "./fixtures/setup.js";
dotenv.config();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("Service router", () => {
    it("should show cart", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jwt.sign({ id: userOne.id }, process.env.JWT_SECRET);
        const response = yield supertest(app)
            .get("/cart")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe(productOne.name);
        expect(response.body[0].price).toBe(String(productOne.price));
        expect(response.body[0].quantity).toBe(String(orderProductOne.quantity));
    }));
    it("should purchase", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jwt.sign({ id: userOne.id }, process.env.JWT_SECRET);
        const response = yield supertest(app)
            .post("/purchase")
            .set("Authorization", `Bearer ${token}`)
            .send({
            product_id: productOne.id,
            quantity: orderProductOne.quantity,
        })
            .expect(200);
        expect(response.body).toEqual([Object.assign(Object.assign({}, orderProductOne), { id: 1 })]);
    }));
    it("should show order", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jwt.sign({ id: userOne.id }, process.env.JWT_SECRET);
        const response = yield supertest(app)
            .get("/orders/order/" + orderOne.id)
            .set("Authorization", `Bearer ${token}`)
            .expect(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe(productOne.name);
        expect(response.body[0].price).toBe(String(productOne.price));
        expect(response.body[0].quantity).toBe(String(orderProductOne.quantity));
    }));
});
