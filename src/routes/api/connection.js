require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: process.env.PGUSER,
    port: 5432,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE,
});

client.connect();

module.exports = client; 
