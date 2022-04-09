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
import bcrypt from "bcrypt";
class User {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *', [user.email, user.username, bcrypt.hashSync(user.password, 10)]);
            client.release();
            const createdUser = results.rows[0];
            return createdUser;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM users');
            client.release();
            const users = results.rows;
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM users WHERE id = $1', [id]);
            client.release();
            const user = results.rows[0];
            return user;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('SELECT * FROM users WHERE username = $1', [username]);
            client.release();
            const user = results.rows[0];
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            }
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            client.release();
            const deletedUser = results.rows[0];
            return deletedUser;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const results = yield client.query('DELETE FROM users');
            client.release();
            const deletedUsers = results.rows;
            return deletedUsers;
        });
    }
}
export default User;
