import pool from "../database.js";

export type category = {
    id: number;
    name: string;
};

class Category{
    async getAll(): Promise<category[]> {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM categories');
            client.release()
            const categories = results.rows;
            return categories;
        }
        catch (err) {
            throw new Error(err as string);
        }
    }
    async getById(id: number): Promise<category> {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM categories WHERE id = $1', [id]);
            client.release()
            const category = results.rows[0];
            return category;
        } catch (err) {
            throw new Error(err as string);
        }
    }
    async create(category: category): Promise<category> {
        try {
            const client = await pool.connect();
            const results = await client.query('INSERT INTO categories(name) VALUES($1) RETURNING *', [category.name]);
            client.release()
            const createdCategory = results.rows[0];
            return createdCategory;
        } catch (err) {
            throw new Error(err as string);
        }
    }
}

export default Category