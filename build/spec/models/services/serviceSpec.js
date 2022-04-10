var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setupDatabase, serviceInstance, userOne, orderOne, productOne, orderProductOne } from "../../fixtures/setup.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("Service model", () => {
    it("should show cart", () => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield serviceInstance.showCart(userOne.id);
        expect(cart).toEqual([{ name: productOne.name, price: (productOne.price).toString(), quantity: (orderProductOne.quantity).toString() }]);
    }));
    it("should show order products", () => __awaiter(void 0, void 0, void 0, function* () {
        const orderProducts = yield serviceInstance.showOrderProducts(orderOne.id, userOne.id);
        expect(orderProducts).toEqual([{ name: productOne.name, price: (productOne.price).toString(), quantity: (orderProductOne.quantity).toString() }]);
    }));
    it("should purchase", () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield serviceInstance.purchase(userOne.id, productOne.id, orderProductOne.quantity);
        expect(order).toEqual([Object.assign(Object.assign({}, orderProductOne), { id: 1 })]);
    }));
});
