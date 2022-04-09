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
class Category {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM categories');
            client.release();
            const categories = results.rows;
            return categories;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM categories WHERE id = $1', [id]);
            client.release();
            const category = results.rows[0];
            return category;
        });
    }
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('INSERT INTO categories(name) VALUES($1) RETURNING *', [category.name]);
            client.release();
            const createdCategory = results.rows[0];
            return createdCategory;
        });
    }
}
export default Category;
