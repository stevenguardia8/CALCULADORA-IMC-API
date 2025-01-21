import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // configuracion de dotenv

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    BD_PORT,
} = process.env;

const DB_CONN = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: BD_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const ObtenerConexion = async () => {
    return await DB_CONN.getConnection();
}