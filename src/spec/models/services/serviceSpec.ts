import {setupDatabase, serviceInstance, userOne, orderOne, productOne, orderProductOne } from "../../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});


describe("Service model", () => {
    it("should show cart", async () => {
        const cart = await serviceInstance.showCart(userOne.id);
        expect(cart).toEqual([{name: productOne.name, price: (productOne.price).toString(), quantity: (orderProductOne.quantity).toString()}]);
    });
    it("should show order products", async () => {
        const orderProducts = await serviceInstance.showOrderProducts(orderOne.id, userOne.id);
        expect(orderProducts).toEqual([{name: productOne.name, price: (productOne.price).toString(), quantity: (orderProductOne.quantity).toString()}]);
    });
    it("should purchase", async () => {
        const order = await serviceInstance.purchase(userOne.id, productOne.id, orderProductOne.quantity);
        expect(order).toEqual([{...orderProductOne, id: 1}]);
    });
});