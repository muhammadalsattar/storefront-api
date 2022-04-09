var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'supertest';
import orderRouter from '../../routers/order.js';
describe('Order router', () => {
    it('should get order by id and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        request(orderRouter).get('/orders/1').expect(200);
    }));
    it('should get order by status and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        request(orderRouter).get('/orders/1/status/active').expect(200);
    }));
    it('should create order and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        request(orderRouter).post('/orders').send({
            product_id: 1,
            quantity: 5,
            status: 'active',
        }).expect(200);
    }));
});
