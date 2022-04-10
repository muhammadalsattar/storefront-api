import {setupDatabase, productInstance, productOne, categoryOne, productTwo } from "../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});

describe("Product model", () => {
    it("should get all products", async () => {
        const products = await productInstance.getAll();
        expect(products).toEqual([productOne]);
    });
    it("should get product by id", async () => {
        const product = await productInstance.getById(productOne.id);
        expect(product).toEqual(productOne);
    });
    it("should create product", async () => {
        const product = await productInstance.create(productTwo);
        expect(product).toEqual({...productTwo, id: 1});
    });
    it("should get products by category id", async () => {
        const products = await productInstance.getByCategoryId(categoryOne.id);
        expect(products).toEqual([productOne]);
    });
});

