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
class Product {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM products');
            client.release();
            const products = results.rows;
            return products;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield pool.connect();
                const results = yield client.query('SELECT * FROM products WHERE id = $1', [id]);
                client.release();
                const products = results.rows;
                return products[0];
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield pool.connect();
                const results = yield client.query('INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *', [product.name, product.price, product.category_id]);
                client.release();
                const products = results.rows;
                return products[0];
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getByCategoryId(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield pool.connect();
                const results = yield client.query('SELECT * FROM products WHERE category_id = $1', [category_id]);
                client.release();
                const products = results.rows;
                return products;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
export default Product;
