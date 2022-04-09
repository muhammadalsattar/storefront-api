import pool from "../database.js";
import bcrypt from "bcrypt";


export type user = {
    id: number;
    email: string;
    username: string;
    password: string;
}

class User {
    async create(user: user): Promise<user> {
        const client = await pool.connect();
        const results = await client.query('INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *', [user.email, user.username, bcrypt.hashSync(user.password, 10)])
        client.release()
        const createdUser = results.rows[0];
        return createdUser;
    }
    async getAll(): Promise<user[]> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM users');
        client.release()
        const users = results.rows;
        return users;
    }
    async getById(id: number): Promise<user> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        client.release()
        const user = results.rows[0];
        return user;
    }
    async login(username: string, password: string): Promise<user | null> {
        const client = await pool.connect();
        const results = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        client.release()
        const user = results.rows[0];
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }
    async delete(id: number): Promise<user> {
        const client = await pool.connect();
        const results = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        client.release()
        const deletedUser = results.rows[0];
        return deletedUser;
    }
    async deleteAll(): Promise<user[]> {
        const client = await pool.connect();
        const results = await client.query('DELETE FROM users');
        client.release()
        const deletedUsers = results.rows;
        return deletedUsers;
    }
}

export default User;