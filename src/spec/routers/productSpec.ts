import request from "supertest";
import productRouter from "../../routers/product.js";
import auth from '../../middleware/auth.js';


describe("Product router", () => {
    it("should get products and return 200", async () => {
        request(productRouter).get("/products").expect(200);
    });
    it("should get product by id and return 200", async () => {
        request(productRouter).get("/products/1").expect(200);
    });
    it("should create product and return 200", async () => {
        request(productRouter).post("/products").send({
        name: "test",
        price: 1,
        category_id: 1,
        }).expect(200);
    });
    it("should get product by category and return 200", async () => {
        request(productRouter).get("/products/category/1").expect(200);
    });
});