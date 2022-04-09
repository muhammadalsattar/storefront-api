var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pool from "../../database.js";
class Service {
    showCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const activeOrder = yield client.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [userId, "active"]);
            if (activeOrder.rowCount === 0) {
                client.release();
                return [];
            }
            else {
                const orderId = activeOrder.rows[0].id;
                const results = yield client.query('SELECT (name, price, quantity) FROM order_product JOIN products ON order_product.product_id = products.id JOIN orders ON order_product.order_id = orders.id WHERE order_product.order_id = $1 AND orders.user_id = $2', [orderId, userId]);
                client.release();
                const cart = results.rows.map(row => {
                    return {
                        name: row.row.replace(/[\])}[{(]/g, '').split(',')[0].replace(/\"/g, ''),
                        price: row.row.replace(/[\])}[{(]/g, '').split(',')[1],
                        quantity: row.row.replace(/[\])}[{(]/g, '').split(',')[1]
                    };
                });
                return cart;
            }
        });
    }
    showOrderProducts(orderId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT (name, price, quantity) FROM order_product JOIN products ON order_product.product_id = products.id JOIN orders ON order_product.order_id = orders.id WHERE order_product.order_id = $1 AND orders.user_id = $2', [orderId, userId]);
            client.release();
            const cart = results.rows.map(row => {
                return {
                    name: row.row.replace(/[\])}[{(]/g, '').split(',')[0].replace(/\"/g, ''),
                    price: row.row.replace(/[\])}[{(]/g, '').split(',')[1],
                    quantity: row.row.replace(/[\])}[{(]/g, '').split(',')[1]
                };
            });
            return cart;
        });
    }
    purchase(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const activeOrder = yield client.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [userId, "active"]);
            if (activeOrder.rowCount === 0) {
                const newOrder = yield client.query('INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *', [userId, "active"]);
                const newOrderId = newOrder.rows[0].id;
                const newOrderProduct = yield client.query('INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [newOrderId, productId, quantity]);
                client.release();
                return newOrderProduct.rows;
            }
            else {
                const newOrderProduct = yield client.query('INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [activeOrder.rows[0].id, productId, quantity]);
                client.release();
                return newOrderProduct.rows;
            }
        });
    }
}
export default Service;
