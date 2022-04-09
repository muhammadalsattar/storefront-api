var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from "../../models/product.js";
describe("Product model", () => {
    it("should get all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = new Product();
        expect(product.getAll()).toBeDefined();
    }));
    it("should get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = new Product();
        const newProduct = yield product.getById(1);
        expect(product).toBeDefined();
        expect(newProduct.id).toBe(1);
    }));
    it("should create product", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = new Product();
        const myProduct = {
            id: 6,
            name: "test",
            price: 10,
            category_id: 1
        };
        const newProduct = yield product.create(myProduct);
        expect(newProduct).toBeDefined();
        expect(newProduct.name).toBe("test");
        expect(newProduct.price).toBe(10);
        expect(newProduct.category_id).toBe(1);
    }));
    it("should get products by category id", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = new Product();
        const products = yield product.getByCategoryId(1);
        expect(product.getByCategoryId).toBeDefined();
        expect(products[0].category_id).toBe(1);
    }));
});
