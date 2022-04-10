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
import app from "../../app.js";
import { setupDatabase, orderProductOne } from "../fixtures/setup.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("orderProductRouter", () => {
    it("GET /orderproduct/order/:orderId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/orderproduct/order/${orderProductOne.order_id}`);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(orderProductOne.id);
        expect(response.body[0].order_id).toBe(orderProductOne.order_id);
        expect(response.body[0].product_id).toBe(orderProductOne.product_id);
        expect(response.body[0].quantity).toBe(orderProductOne.quantity);
    }));
    it("GET /orderproduct/product/:productId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/orderproduct/product/${orderProductOne.product_id}`);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(orderProductOne.id);
        expect(response.body[0].order_id).toBe(orderProductOne.order_id);
        expect(response.body[0].product_id).toBe(orderProductOne.product_id);
        expect(response.body[0].quantity).toBe(orderProductOne.quantity);
    }));
});
