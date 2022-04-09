import pool from "../database.js";

export type order_product = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

class OrderProduct {
    async getByOrderId(order_id: number): Promise<order_product[]> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM order_product WHERE order_id = $1', [order_id]);
        client.release()
        const order_products = results.rows;
        return order_products;
    }
    async getByProductId(product_id: number): Promise<order_product[]> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM order_product WHERE product_id = $1', [product_id]);
        client.release()
        const order_products = results.rows;
        return order_products;
    }
}

export default OrderProduct;