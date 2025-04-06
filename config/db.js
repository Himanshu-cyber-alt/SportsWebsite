import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Run table creation only once (optional for dev)
(async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS SportsCustomer (
                id SERIAL PRIMARY KEY,
                name VARCHAR(30) NOT NULL,
                email VARCHAR(105) UNIQUE NOT NULL,
                password VARCHAR(100)
            );
        `);
        console.log(" SportsCustomer table is ready");
    } catch (err) {
        console.error(" Error creating table:", err);
    }
})();

export default pool;
