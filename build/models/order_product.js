var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pool from "../database.js";
class OrderProduct {
    getByOrderId(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM order_product WHERE order_id = $1', [order_id]);
            client.release();
            const order_products = results.rows;
            return order_products;
        });
    }
    getByProductId(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM order_product WHERE product_id = $1', [product_id]);
            client.release();
            const order_products = results.rows;
            return order_products;
        });
    }
}
export default OrderProduct;
