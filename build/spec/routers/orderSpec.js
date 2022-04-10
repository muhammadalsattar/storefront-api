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
import app from "../../app.js";
import { setupDatabase, orderOne, userOne } from "../fixtures/setup.js";
dotenv.config();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("Order router", () => {
    it("should get orders by userId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/orders/${orderOne.user_id}`).set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([orderOne]);
    }));
    it("should fail get orders for unauthenticated users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/orders/${orderOne.user_id}`);
        expect(response.status).toBe(401);
    }));
    it("should get orders by status", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/orders/${orderOne.user_id}/${orderOne.status}`).set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([orderOne]);
    }));
    it("should complete order", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).post(`/checkout/${orderOne.id}`).set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(Object.assign(Object.assign({}, orderOne), { status: "completed" }));
    }));
});
