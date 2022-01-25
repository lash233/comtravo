import { performance } from "perf_hooks";
import request from "supertest";
import app from "../src/app";

describe('GET /flights', () => {
  test(`should send status 408 if response time takes more than 1 second,
    otherwise sends status 200`,
    async () => {
      const start = performance.now();
      const response = await request(app)
      .get('/api/flights');
      const elapsed = performance.now() - start;
      if (elapsed > 1000) {
        expect(response.status).toBe(408);
      } else {
        expect(response.status).toBe(200);
      }
    })
 });