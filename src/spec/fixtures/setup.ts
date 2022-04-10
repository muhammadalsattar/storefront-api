import bcrypt from "bcrypt";
import pool from "../../database.js";
import User, {user} from "../../models/user.js";
import Product, {product} from "../../models/product.js";
import Order, {order} from "../../models/order.js";
import OrderProduct, {order_product} from "../../models/order_product.js";
import Category, {category} from "../../models/category.js";
import Service from "../../models/services/service.js";

export const userInstance = new User();
export const productInstance = new Product();
export const orderInstance = new Order();
export const order_productInstance = new OrderProduct();
export const categoryInstance = new Category();
export const serviceInstance = new Service();

export const userOnePassword = "password";
export const userTwoPassword = "password2";

export const userOne: user = {
    "email": "example@email.com",
    "id": 100,
    "username": "example",
    "password": bcrypt.hashSync(userOnePassword, 10),
}
export const userTwo: user = {
    "email": "example2",
    "id": 101,
    "username": "example2",
    "password": userTwoPassword,
}
export const categoryOne: category = {
    "id": 100,
    "name": "example",
}
export const categoryTwo: category = {
    "id": 101,
    "name": "example2",
}
export const productOne: product = {
    "id": 100,
    "name": "example",
    "price": 100,
    "category_id": 100,
}

export const productTwo: product = {
    "id": 200,
    "name": "example2",
    "price": 100,
    "category_id": 100,
}

export const orderOne: order = {
    "id": 100,
    "user_id": 100,
    "status": "active",
}
export const orderProductOne: order_product = {
    "id": 100,
    "order_id": 100,
    "product_id": 100,
    "quantity": 100,
}

export const setupDatabase = async () => {
    const client = await pool.connect();
    await client.query("BEGIN");

    await client.query("DROP TABLE IF EXISTS users CASCADE");
    await client.query("DROP TABLE IF EXISTS products CASCADE");
    await client.query("DROP TABLE IF EXISTS orders CASCADE");
    await client.query("DROP TABLE IF EXISTS order_product CASCADE");
    await client.query("DROP TABLE IF EXISTS categories CASCADE");

    await client.query("CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)");
    await client.query("CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL)");
    await client.query("CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, price INTEGER NOT NULL, category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE)");
    await client.query("CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, status VARCHAR(255) NOT NULL)");
    await client.query("CREATE TABLE order_product (id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE, product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, quantity INTEGER NOT NULL)");

    await client.query("INSERT INTO users(id, username, email, password) VALUES($1, $2, $3, $4)", [userOne.id, userOne.username, userOne.email, userOne.password]);
    await client.query("INSERT INTO categories(id, name) VALUES($1, $2)", [categoryOne.id, categoryOne.name]);
    await client.query("INSERT INTO products(id, name, price, category_id) VALUES($1, $2, $3, $4)", [productOne.id, productOne.name, productOne.price, productOne.category_id]);
    await client.query("INSERT INTO orders(id, user_id, status) VALUES($1, $2, $3)", [orderOne.id, orderOne.user_id, orderOne.status]);
    await client.query("INSERT INTO order_product(id, order_id, product_id, quantity) VALUES($1, $2, $3, $4)", [orderProductOne.id, orderProductOne.order_id, orderProductOne.product_id, orderProductOne.quantity]);

    await client.query("COMMIT");
    client.release();
}