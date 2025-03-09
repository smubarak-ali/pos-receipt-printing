import pg from 'pg';

const { Pool } = pg

const pool = new Pool({
    host: 'localhost',
    user: 'yasir',
    password: process.env.DB_PASSWORD,
    database: 'yasir_db',
    port: 5433,

});

export const query = (text: string, params: any[]) => pool.query(text, params);
