require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    port: process.env.PGPORT,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE
});

client.connect();

module.exports = client;
