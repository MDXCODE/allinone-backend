
require('dotenv').config();
const { Client } = require('pg');

let client; 
let isConnected = false; 

const createClient = async () => {
  if (client && isConnected) {
    return client;
  }

  client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    port: process.env.PGPORT,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE
  });

  try {
    await client.connect();
    isConnected = true;
    console.log('Connected to the database');
    return client;
  } catch (err) {
    console.error('Database connection error', err);
    throw err;
  }
};

const closeClient = async () => {
  if (client && isConnected) {
    try {
      await client.end();
      isConnected = false;
      console.log('Disconnected from the database');
    } catch (err) {
      console.error('Error disconnecting from the database', err);
    }
  }
};

module.exports = { createClient, closeClient };