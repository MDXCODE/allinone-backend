const request = require('supertest');
const app = require('../../src/app');
const { createClient, closeClient } = require('../../src/routes/api/connection');

describe('/ health check', () => {
   let client;

  beforeAll(async () => {
    client = await createClient();
  });

  afterAll(async () => {
    await closeClient();
  });

  describe('GET /users', () => {
    it('should respond with status 200 and return an array of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /tasks', () => {
    it('should respond with status 200 and return an array of tasks', async () => {
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
