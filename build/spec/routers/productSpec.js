var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from "supertest";
import productRouter from "../../routers/product.js";
describe("Product router", () => {
    it("should get products and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(productRouter).get("/products").expect(200);
    }));
    it("should get product by id and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(productRouter).get("/products/1").expect(200);
    }));
    it("should create product and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(productRouter).post("/products").send({
            name: "test",
            price: 1,
            category_id: 1,
        }).expect(200);
    }));
    it("should get product by category and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(productRouter).get("/products/category/1").expect(200);
    }));
});
