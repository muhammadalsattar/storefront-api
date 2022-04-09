import pool from "../database.js";

export type category = {
    id: number;
    name: string;
};

class Category{
    async getAll(): Promise<category[]> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM categories');
        client.release()
        const categories = results.rows;
        return categories;
    }
    async getById(id: number): Promise<category> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM categories WHERE id = $1', [id]);
        client.release()
        const category = results.rows[0];
        return category;
    }
    async create(category: category): Promise<category> {
        const client = await pool.connect();
        const results = await client.query('INSERT INTO categories(name) VALUES($1) RETURNING *', [category.name]);
        client.release()
        const createdCategory = results.rows[0];
        return createdCategory;
    }
}

export default Category