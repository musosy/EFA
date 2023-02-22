import request from 'supertest';
import app from '../../src/server';
import { HelloWorldErrorEnum } from '../../src/api/helloworld/helloworld.error';
import prisma from '../../src/config/client';
import {
    createInvalidHelloWorldMock,
    createValidHelloWorldMock,
    helloWorldIdMock,
    updateValidHelloWorldMock,
    updateInvalidHelloWorldMock,
} from './helloworld.mock';
import HelloWorldRepository from '../../src/api/helloworld/helloworld.repository';

describe('HelloWorldRepository tests', () => {
    beforeAll(async () => {
        await prisma.helloworld.deleteMany();
    });
    afterEach(async () => {
        await prisma.helloworld.deleteMany();
    });
    afterAll(async () => {
        await request(app).get('/shutdown');
    });
    describe('GET "/" tests', () => {
        it('should return an array', async () => {
            const result = await request(app)
                .get('/api')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toBeInstanceOf(Array);
            expect(result.body.length).toEqual(0);
        });
    });
    describe('GET "/:id" tests', () => {
        it('should return an error', async () => {
            const result = await request(app)
                .get(`/api/${helloWorldIdMock}`)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('error');
            expect(result.body.error).toHaveProperty('message');
            expect(result.body.error).toHaveProperty('details');
        });
        it('should return the requested entity', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            )._unsafeUnwrap();
            const result = await request(app)
                .get(`/api/${insert.id}`)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('value');
            expect(result.body.value).toHaveProperty('id');
            expect(result.body.value).toHaveProperty('status');
            expect(result.body.value).toHaveProperty('message');
        });
    });
    describe('POST "/" tests', () => {
        it('should return the created entity', async () => {
            const result = await request(app)
                .post('/api')
                .send(createValidHelloWorldMock)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('value');
            expect(result.body.value).toHaveProperty('id');
            expect(result.body.value).toHaveProperty('status');
            expect(result.body.value).toHaveProperty('message');
            expect(result.body.value.status).toEqual(
                createValidHelloWorldMock.status
            );
            expect(result.body.value.message).toEqual(
                createValidHelloWorldMock.message
            );
        });
        it('should return an error', async () => {
            const result = await request(app)
                .post('/api')
                .send(createInvalidHelloWorldMock)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('error');
            expect(result.body.error).toHaveProperty('message');
            expect(result.body.error).toHaveProperty('details');
            expect(result.body.error.message).toEqual(
                HelloWorldErrorEnum.CreationError
            );
        });
    });
    describe('DELETE "/:id" tests', () => {
        it('should return the deleted entity', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            )._unsafeUnwrap();
            const result = await request(app)
                .delete(`/api/${insert.id}`)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('value');
            expect(result.body.value).toHaveProperty('id');
            expect(result.body.value).toHaveProperty('status');
            expect(result.body.value).toHaveProperty('message');
            expect(result.body.value.status).toEqual(
                createValidHelloWorldMock.status
            );
            expect(result.body.value.message).toEqual(
                createValidHelloWorldMock.message
            );
        });
        it('should return an error', async () => {
            const result = await request(app)
                .delete(`/api/${helloWorldIdMock}`)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('error');
            expect(result.body.error).toHaveProperty('message');
            expect(result.body.error).toHaveProperty('details');
            expect(result.body.error.message).toEqual(
                HelloWorldErrorEnum.DeletionError
            );
        });
    });
    describe('PUT "/:id" tests', () => {
        it('should update the entity', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            )._unsafeUnwrap();
            const result = await request(app)
                .put(`/api/${insert.id}`)
                .send(updateValidHelloWorldMock)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('value');
            expect(result.body.value).toHaveProperty('id');
            expect(result.body.value).toHaveProperty('status');
            expect(result.body.value).toHaveProperty('message');
            expect(result.body.value.id).toEqual(insert.id);
            expect(result.body.value.status).toEqual(
                updateValidHelloWorldMock.status
            );
            expect(result.body.value.message).toEqual(
                updateValidHelloWorldMock.message
            );
        });
        it('should return an error for invalid id', async () => {
            const result = await request(app)
                .put(`/api/${helloWorldIdMock}`)
                .send(updateValidHelloWorldMock)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('error');
            expect(result.body.error).toHaveProperty('message');
            expect(result.body.error).toHaveProperty('details');
            expect(result.body.error.message).toEqual(
                HelloWorldErrorEnum.UpdateError
            );
        });
        it('should return an error for invalid body', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            )._unsafeUnwrap();
            const result = await request(app)
                .put(`/api/${insert.id}`)
                .send(updateInvalidHelloWorldMock)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);
            expect(result.body).toHaveProperty('error');
            expect(result.body.error).toHaveProperty('message');
            expect(result.body.error).toHaveProperty('details');
            expect(result.body.error.message).toEqual(
                HelloWorldErrorEnum.UpdateError
            );
        });
    });
});
