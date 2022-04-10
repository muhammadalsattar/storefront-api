import {setupDatabase, order_productInstance, orderProductOne} from "../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});

describe("OrderProduct model", () => {
    it("should get order_product by order id", async () => {
        const order_products = await order_productInstance.getByOrderId(orderProductOne.id);
        expect(order_products).toEqual([orderProductOne]);
    });
    it("should get order_product by product id", async () => {
        const order_products = await order_productInstance.getByProductId(orderProductOne.id);
        expect(order_products).toEqual([orderProductOne]);
    });
});