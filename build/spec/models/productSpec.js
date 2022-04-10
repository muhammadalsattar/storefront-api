var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setupDatabase, productInstance, productOne, categoryOne, productTwo } from "../fixtures/setup.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("Product model", () => {
    it("should get all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield productInstance.getAll();
        expect(products).toEqual([productOne]);
    }));
    it("should get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productInstance.getById(productOne.id);
        expect(product).toEqual(productOne);
    }));
    it("should create product", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productInstance.create(productTwo);
        expect(product).toEqual(Object.assign(Object.assign({}, productTwo), { id: 1 }));
    }));
    it("should get products by category id", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield productInstance.getByCategoryId(categoryOne.id);
        expect(products).toEqual([productOne]);
    }));
});
