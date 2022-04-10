import supertest from "supertest";
import app from "../../app.js";
import {setupDatabase, categoryInstance, categoryOne, categoryTwo} from "../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});


describe("Category router", () => {
    it("should get all categories", async () => {
        const response = await supertest(app).get("/categories");
        expect(response.status).toBe(200);
        expect([response.body]).toEqual([await categoryInstance.getAll()]);
    });
    it("should get category by id", async () => {
        const response = await supertest(app).get(`/categories/${categoryOne.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(categoryOne);
    });
    it("should create category", async () => {
        const response = await supertest(app).post("/categories").send(categoryTwo);
        expect(response.status).toBe(201);
        expect([response.body]).toEqual([{...categoryTwo, id: 1}]);
    });
});