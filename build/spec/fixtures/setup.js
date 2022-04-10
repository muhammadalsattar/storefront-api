var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import pool from "../../database.js";
import User from "../../models/user.js";
import Product from "../../models/product.js";
import Order from "../../models/order.js";
import OrderProduct from "../../models/order_product.js";
import Category from "../../models/category.js";
import Service from "../../models/services/service.js";
export const userInstance = new User();
export const productInstance = new Product();
export const orderInstance = new Order();
export const order_productInstance = new OrderProduct();
export const categoryInstance = new Category();
export const serviceInstance = new Service();
export const userOnePassword = "password";
export const userTwoPassword = "password2";
export const userOne = {
    "email": "example@email.com",
    "id": 100,
    "username": "example",
    "password": bcrypt.hashSync(userOnePassword, 10),
};
export const userTwo = {
    "email": "example2",
    "id": 101,
    "username": "example2",
    "password": userTwoPassword,
};
export const categoryOne = {
    "id": 100,
    "name": "example",
};
export const categoryTwo = {
    "id": 101,
    "name": "example2",
};
export const productOne = {
    "id": 100,
    "name": "example",
    "price": 100,
    "category_id": 100,
};
export const productTwo = {
    "id": 200,
    "name": "example2",
    "price": 100,
    "category_id": 100,
};
export const orderOne = {
    "id": 100,
    "user_id": 100,
    "status": "active",
};
export const orderProductOne = {
    "id": 100,
    "order_id": 100,
    "product_id": 100,
    "quantity": 100,
};
export const setupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        yield client.query("BEGIN");
        yield client.query("DROP TABLE IF EXISTS users CASCADE");
        yield client.query("DROP TABLE IF EXISTS products CASCADE");
        yield client.query("DROP TABLE IF EXISTS orders CASCADE");
        yield client.query("DROP TABLE IF EXISTS order_product CASCADE");
        yield client.query("DROP TABLE IF EXISTS categories CASCADE");
        yield client.query("CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)");
        yield client.query("CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL)");
        yield client.query("CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, price INTEGER NOT NULL, category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE)");
        yield client.query("CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, status VARCHAR(255) NOT NULL)");
        yield client.query("CREATE TABLE order_product (id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE, product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, quantity INTEGER NOT NULL)");
        yield client.query("INSERT INTO users(id, username, email, password) VALUES($1, $2, $3, $4)", [userOne.id, userOne.username, userOne.email, userOne.password]);
        yield client.query("INSERT INTO categories(id, name) VALUES($1, $2)", [categoryOne.id, categoryOne.name]);
        yield client.query("INSERT INTO products(id, name, price, category_id) VALUES($1, $2, $3, $4)", [productOne.id, productOne.name, productOne.price, productOne.category_id]);
        yield client.query("INSERT INTO orders(id, user_id, status) VALUES($1, $2, $3)", [orderOne.id, orderOne.user_id, orderOne.status]);
        yield client.query("INSERT INTO order_product(id, order_id, product_id, quantity) VALUES($1, $2, $3, $4)", [orderProductOne.id, orderProductOne.order_id, orderProductOne.product_id, orderProductOne.quantity]);
        yield client.query("COMMIT");
        client.release();
    }
    catch (err) {
        throw new Error(err);
    }
});
