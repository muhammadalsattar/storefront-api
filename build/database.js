import pg from 'pg';
const Pool = pg.Pool;
import dotenv from 'dotenv';
dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, } = process.env;
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
});
export default pool;
