import pool from "../database.js";


export type order = {
    id: number;
    user_id: number;
    status: string;
}

class Order {
    async getByUserId(user_id: number): Promise<order[]> {
        try{
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
            client.release()
            const orders = results.rows;
            return orders;
        } catch (err) {
            throw new Error(err as string);
        }
    }
    async getByStatus(user_id: number, status: string): Promise<order[]> {
        try{
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM orders WHERE status = $1 AND user_id = $2', [status, user_id]);
            client.release()
            const orders = results.rows;
            return orders;
        } catch (err) {
            throw new Error(err as string);
        }
    }
    async complete(order_id: number, userId: number): Promise<order> {
        try{
            const client = await pool.connect();
            const results = await client.query("UPDATE orders SET status = 'completed' WHERE id = $1 AND user_id = $2 RETURNING *", [order_id, userId]);
            client.release()
            const orders = results.rows;
            return orders[0];
        } catch (err) {
            throw new Error(err as string);
        }
    }
}

export default Order;