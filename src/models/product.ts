import pool from "../database.js";


export type product = {
    id: number;
    name: string;
    price: number;
    category_id: number;
}

class Product {
    async getAll(): Promise<product[]> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM products');
        client.release()
        const products = results.rows;
        return products;
    }
    async getById(id: number): Promise<product> {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM products WHERE id = $1', [id]);
            client.release()
            const products = results.rows;
            return products[0];
        } catch (err) {
            throw new Error(err as string);
        }
    }
    async create(product: product): Promise<product> {
        try {
            const client = await pool.connect();
            const results = await client.query('INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *', [product.name, product.price, product.category_id]);
            client.release()
            const products = results.rows;
            return products[0];
        } catch (err) {
            throw new Error(err as string);
        }
    }
    async getByCategoryId(category_id: number): Promise<product[]> {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM products WHERE category_id = $1', [category_id]);
            client.release()
            const products = results.rows;
            return products;
        } catch (err) {
            throw new Error(err as string);
        }
    }
}

export default Product;