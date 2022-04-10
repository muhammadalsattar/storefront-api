var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setupDatabase, order_productInstance, orderProductOne } from "../fixtures/setup.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("OrderProduct model", () => {
    it("should get order_product by order id", () => __awaiter(void 0, void 0, void 0, function* () {
        const order_products = yield order_productInstance.getByOrderId(orderProductOne.id);
        expect(order_products).toEqual([orderProductOne]);
    }));
    it("should get order_product by product id", () => __awaiter(void 0, void 0, void 0, function* () {
        const order_products = yield order_productInstance.getByProductId(orderProductOne.id);
        expect(order_products).toEqual([orderProductOne]);
    }));
});
