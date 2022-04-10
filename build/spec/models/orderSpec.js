var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setupDatabase, orderInstance, userOne, orderOne } from "../fixtures/setup.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("Order model", () => {
    it("should get orders by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield orderInstance.getByUserId(userOne.id);
        expect(orders).toEqual([orderOne]);
    }));
    it("should get orders by status", () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield orderInstance.getByStatus(userOne.id, orderOne.status);
        expect(orders).toEqual([orderOne]);
    }));
    it("should complete order", () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield orderInstance.complete(orderOne.id, userOne.id);
        expect(order).toEqual(Object.assign(Object.assign({}, orderOne), { status: "completed" }));
    }));
});
