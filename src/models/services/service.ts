import pool from "../../database.js";

class Service {
    async showCart(userId: number): Promise<any> {
        try{
            const client = await pool.connect();
            const activeOrder = await client.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [userId, "active"]);
            if(activeOrder.rowCount === 0) {
                client.release()
                return [];
            } else {
                const orderId = activeOrder.rows[0].id;
                const results = await client.query('SELECT (name, price, quantity) FROM order_product JOIN products ON order_product.product_id = products.id JOIN orders ON order_product.order_id = orders.id WHERE order_product.order_id = $1 AND orders.user_id = $2', [orderId, userId]);
                client.release()
                const cart = results.rows.map(row => {
                    return {
                        name: row.row.replace(/[\])}[{(]/g, '').split(',')[0].replace(/\"/g, ''),
                        price: row.row.replace(/[\])}[{(]/g, '').split(',')[1],
                        quantity: row.row.replace(/[\])}[{(]/g, '').split(',')[1]
                    }
                });
                return cart;
            }
        }catch(e){
            throw new Error(e as string);
        }
    }
    async showOrderProducts(orderId: number, userId: number): Promise<any> {
        try{
            const client = await pool.connect();
            const results = await client.query('SELECT (name, price, quantity) FROM order_product JOIN products ON order_product.product_id = products.id JOIN orders ON order_product.order_id = orders.id WHERE order_product.order_id = $1 AND orders.user_id = $2', [orderId, userId]);
            client.release()
            const cart = results.rows.map(row => {
                return {
                    name: row.row.replace(/[\])}[{(]/g, '').split(',')[0].replace(/\"/g, ''),
                    price: row.row.replace(/[\])}[{(]/g, '').split(',')[1],
                    quantity: row.row.replace(/[\])}[{(]/g, '').split(',')[1]
                }
            });
            return cart;
        } catch(e){
            throw new Error(e as string);
        }
    }
    async purchase(userId: number, productId: number, quantity: number): Promise<any> {
        try{
            const client = await pool.connect();
            const activeOrder = await client.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [userId, "active"]);
            if(activeOrder.rowCount === 0) {
                const newOrder = await client.query('INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *', [userId, "active"]);
                const newOrderId = newOrder.rows[0].id;
                const newOrderProduct = await client.query('INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [newOrderId, productId, quantity]);
                client.release()
                return newOrderProduct.rows;
            } else {
                const newOrderProduct = await client.query('INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [activeOrder.rows[0].id, productId, quantity]);
                client.release()
                return newOrderProduct.rows;
            }        
        } catch(e){
            throw new Error(e as string);
        }
    }
}

export default Service;