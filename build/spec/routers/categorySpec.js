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
import { setupDatabase, categoryInstance, categoryOne, categoryTwo } from "../fixtures/setup.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("Category router", () => {
    it("should get all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get("/categories");
        expect(response.status).toBe(200);
        expect([response.body]).toEqual([yield categoryInstance.getAll()]);
    }));
    it("should get category by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/categories/${categoryOne.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(categoryOne);
    }));
    it("should create category", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).post("/categories").send(categoryTwo);
        expect(response.status).toBe(201);
        expect([response.body]).toEqual([Object.assign(Object.assign({}, categoryTwo), { id: 1 })]);
    }));
});
