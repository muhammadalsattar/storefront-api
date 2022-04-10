import {setupDatabase, orderInstance, userOne, orderOne, productOne, orderProductOne } from "../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});

describe("Order model", () => {
    it("should get orders by user id", async () => {
        const orders = await orderInstance.getByUserId(userOne.id);
        expect(orders).toEqual([orderOne]);
    });
    it("should get orders by status", async () => {
        const orders = await orderInstance.getByStatus(userOne.id, orderOne.status);
        expect(orders).toEqual([orderOne]);
    });
    it("should complete order", async () => {
        const order = await orderInstance.complete(orderOne.id, userOne.id);
        expect(order).toEqual({...orderOne, status: "completed"});
    });
});