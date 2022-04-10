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
import { setupDatabase, productOne, userOne, productTwo } from "../fixtures/setup.js";
dotenv.config();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("Product router", () => {
    it("should get all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([productOne]);
    }));
    it("should get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/products/${productOne.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(productOne);
    }));
    it("should get products by category id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/products/category/${productOne.category_id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([productOne]);
    }));
    it("should create product", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).post("/products").send(productTwo).set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(Object.assign(Object.assign({}, productTwo), { id: 1 }));
    }));
    it("should fail create product for unauthenticated users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).post("/products").send(productTwo);
        expect(response.status).toBe(401);
    }));
});
