import supertest from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../../app.js";
import {setupDatabase, productOne, userOne, categoryTwo, productTwo} from "../fixtures/setup.js";
dotenv.config();
beforeEach(async () => {
    await setupDatabase();
});

describe("Product router", () => {
    it("should get all products", async () => {
        const response = await supertest(app).get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([productOne]);
    });
    it("should get product by id", async () => {
        const response = await supertest(app).get(`/products/${productOne.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(productOne);
    });
    it("should get products by category id", async () => {
        const response = await supertest(app).get(`/products/category/${productOne.category_id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([productOne]);
    });
    it("should create product", async () => {
        const response = await supertest(app).post("/products").send(productTwo).set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({...productTwo, id: 1});
    });
    it("should fail create product for unauthenticated users", async () => {
        const response = await supertest(app).post("/products").send(productTwo);
        expect(response.status).toBe(401);
    });
});