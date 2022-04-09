import Cart from '../../../models/services/service.js';
describe('Cart model', () => {
    it('should create an instance', () => {
        expect(new Cart()).toBeTruthy();
    });
    // it('showCart should be defined', () => {
    //     const cart = new Cart();
    //     expect(cart.showCart).toBeDefined();
    // });
});
