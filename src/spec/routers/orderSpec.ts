import request from 'supertest';
import orderRouter from '../../routers/order.js';
import auth from '../../middleware/auth.js';

describe('Order router', () => {
    it('should get order by id and return 200', async () => {
        request(orderRouter).get('/orders/1').expect(200);
    });
    it('should get order by status and return 200', async () => {
        request(orderRouter).get('/orders/1/status/active').expect(200);
    });
    it('should create order and return 200', async () => {
        request(orderRouter).post('/orders').send({
            product_id : 1,
            quantity: 5,
            status: 'active',
        }).expect(200);
    });

});