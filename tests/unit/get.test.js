const request = require('supertest');
const app = require('../../src/app');
const { version, author } = require('../../package.json');

describe('/ health check', () => {
  let db;

  beforeAll(async () => {
    // Open the database connection
    db = require('../../src/routes/api/connection');
  });

  afterAll(async () => {
    // Close the database connection after all tests are done
    await db.end();
  });

  describe('GET /users', () => {
    it('should respond with status 200 and return an array of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /tasks', () => {
    it('should respond with status 200 and return an array of users', async () => {
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
