// Ensure you're importing createClient correctly
const { createClient } = require('../src/routes/api/connection');

let client;

beforeAll(async () => {
  client = createClient();
  await client.connect();
});

afterAll(async () => {
  if (client) {
    await client.end(); // Make sure `client` is a `pg.Client` instance
  }
});
