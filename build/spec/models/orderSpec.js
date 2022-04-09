import Order from "../../models/order.js";
describe("Order model", () => {
    it("should create an instance", () => {
        expect(new Order()).toBeTruthy();
    });
    it("should have a property getByUserId", () => {
        const order = new Order();
        expect(order.getByUserId).toBeDefined();
    });
    it("should have a property getByStatus", () => {
        const order = new Order();
        expect(order.getByStatus).toBeDefined();
    });
    // it("should have a property create", () => {
    //     const order = new Order();
    //     expect(order.create).toBeDefined();
    // }); 
});
