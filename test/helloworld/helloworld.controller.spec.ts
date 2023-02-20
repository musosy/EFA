import { describe, it, expect } from '@jest/globals';
import app from '../../src/server';
import request from 'supertest';

describe('HelloWorld Service tests', () => {
    describe('Get "/" tests', () => {
        it('should return an object with a status and a message', async () => {
            const response: request.Response = await request(app)
                .get('/api');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('message');
            expect(response.body.status).toBe(200);
            expect(response.body.message).toBe('Hello World!');
        });
    });
    describe('Get "/:name" tests', () => {
        it('should return an object with a status and a custom message', async () => {
            const name = 'User';
            const response: request.Response = await request(app)
                .get(`/api/${name}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('message');
            expect(response.body.status).toBe(200);
            expect(response.body.message).toBe(`Hello ${name}!`);
        });
    });
});
