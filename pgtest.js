
const { Client } = require('pg');
require('dotenv').config();

const { AZURE_DB_USER, AZURE_DB_PASSWORD, AZURE_DB_SERVER, AZURE_DB_NAME} = process.env;
// if (!AZURE_DB_USER || !AZURE_DB_PASSWORD || !AZURE_DB_HOSTNAME || !AZURE_DB_NAME || !AZURE_DB_PORT) {
// //   throw new Error("The Azure DB environment variables are not set.");
// console.log("The Azure DB environment variables are not set.");
// }
console.log(`${AZURE_DB_USER}`);
const client = new Client({
  user: `${AZURE_DB_USER}`,
  host: `${AZURE_DB_SERVER}`,
  database: `${AZURE_DB_NAME}`,
  password: `${AZURE_DB_PASSWORD}`,
  port: 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Required if using SSL in Azure PostgreSQL
  },
});

async function connectAndQuery() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    const res = await client.query('SELECT * FROM Users;');
    console.log(res.rows[0]);

  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

connectAndQuery();
