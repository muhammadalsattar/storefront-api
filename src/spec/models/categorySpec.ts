import {setupDatabase, categoryInstance, categoryOne, categoryTwo} from "../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});

describe("Category model", () => {
    it("should get category by id", async () => {
        const category = await categoryInstance.getById(categoryOne.id);
        expect(category).toEqual(categoryOne);
    });
    it("should get all categories", async () => {
        const categories = await categoryInstance.getAll();
        expect(categories).toEqual([categoryOne]);
    });
    it("should create category", async () => {
        const category = await categoryInstance.create(categoryTwo);
        expect(category).toEqual({...categoryTwo, id: 1});
    });
});
