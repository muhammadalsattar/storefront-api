import pool from "../database.js";


export type  order = {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    status: string;
}

class Order {
    async getByUserId(user_id: number): Promise<order[]> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
        client.release()
        const orders = results.rows;
        return orders;
    }
    async getByStatus(user_id: number, status: string): Promise<order[]> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM orders WHERE status = $1 AND user_id = $2', [status, user_id]);
        client.release()
        const orders = results.rows;
        return orders;
    }
    async create(order: order, user_id: number): Promise<order> {
        const client = await pool.connect();
        const results = await client.query('INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, order.product_id, order.quantity, order.status]);
        client.release()
        const orders = results.rows;
        return orders[0];
    }
}

export default Order;