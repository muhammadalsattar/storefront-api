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
class Order {
    getByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
            client.release();
            const orders = results.rows;
            return orders;
        });
    }
    getByStatus(user_id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM orders WHERE status = $1 AND user_id = $2', [status, user_id]);
            client.release();
            const orders = results.rows;
            return orders;
        });
    }
    complete(order_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query("UPDATE orders SET status = 'completed' WHERE id = $1 AND user_id = $2 RETURNING *", [order_id, userId]);
            client.release();
            const orders = results.rows;
            return orders[0];
        });
    }
}
export default Order;
