import pool from "../../database.js";

class Service {
    async showCart(userId: number): Promise<any> {
        const client = await pool.connect();
        const results = await client.query('SELECT (name, price, quantity, status) FROM products JOIN orders ON products.id = orders.product_id WHERE orders.user_id = $1', [userId]);
        client.release()
        const cart = results.rows.map(row => {
            return {
                name: row.row.replace(/[\])}[{(]/g, '').split(',')[0],
                price: row.row.replace(/[\])}[{(]/g, '').split(',')[1],
                quantity: row.row.replace(/[\])}[{(]/g, '').split(',')[2],
                status: row.row.replace(/[\])}[{(]/g, '').split(',')[3]
            }
        });
        return cart;
    }
}

export default Service;