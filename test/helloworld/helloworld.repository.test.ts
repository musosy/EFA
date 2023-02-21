import HelloWorldRepository from '../../src/api/helloworld/helloworld.repository';
import { HelloWorldError } from '../../src/api/helloworld/helloworld.error';
import prisma from '../../src/config/client';
import { err } from 'neverthrow';
import {
    createInvalidHelloWorldMock,
    createValidHelloWorldMock,
    helloWorldIdMock,
    updateValidHelloWorldMock,
    updateInvalidHelloWorldMock,
} from './helloworld.mock';

beforeAll(async () => {
    await prisma.helloworld.deleteMany();
});

afterEach(async () => {
    await prisma.helloworld.deleteMany();
});

describe('HelloWorldRepository tests', () => {
    describe('getAll tests', () => {
        it('should return an array', async () => {
            const result = await HelloWorldRepository.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });
    describe('getOne tests', () => {
        it('should return an error', async () => {
            const result = await HelloWorldRepository.getOne(helloWorldIdMock);
            expect(result.isErr()).toBeTruthy();
            expect(result).toEqual(err(HelloWorldError.FindUniqueError));
        });
        it('should return the requested entity', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            ).unwrapOr();
            const wrappedResult = await HelloWorldRepository.getOne(insert.id);
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr();
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.status).toEqual(createValidHelloWorldMock.status);
            expect(result.message).toEqual(createValidHelloWorldMock.message);
        });
    });
    describe('create tests', () => {
        it('should return the created entity', async () => {
            const wrappedResult = await HelloWorldRepository.create(
                createValidHelloWorldMock
            );
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr();
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.status).toEqual(createValidHelloWorldMock.status);
            expect(result.message).toEqual(createValidHelloWorldMock.message);
        });
        it('should return an error', async () => {
            const wrappedResult = await HelloWorldRepository.create(
                createInvalidHelloWorldMock
            );
            expect(wrappedResult.isErr()).toBeTruthy();
            expect(wrappedResult).toEqual(err(HelloWorldError.CreationError));
        });
    });
    describe('delete tests', () => {
        it('should return the deleted entity', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            ).unwrapOr();
            const wrappedResult = await HelloWorldRepository.delete(insert.id);
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr();
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.id).toEqual(insert.id);
            expect(result.status).toEqual(createValidHelloWorldMock.status);
            expect(result.message).toEqual(createValidHelloWorldMock.message);
            const get = await HelloWorldRepository.getOne(result.id);
            expect(get.isErr()).toBeTruthy();
        });
        it('should return an error', async () => {
            const wrappedResult = await HelloWorldRepository.delete(
                helloWorldIdMock
            );
            expect(wrappedResult.isErr()).toBeTruthy();
            expect(wrappedResult).toEqual(err(HelloWorldError.DeletionError));
        });
    });
    describe('update tests', () => {
        it('should update the entity', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            ).unwrapOr();
            const wrappedResult = await HelloWorldRepository.update(
                insert.id,
                updateValidHelloWorldMock
            );
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr();
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.id).toEqual(insert.id);
            expect(result.status).toEqual(updateValidHelloWorldMock.status);
            expect(result.message).toEqual(updateValidHelloWorldMock.message);
        });
        it('should return an error for invalid id', async () => {
            const wrappedResult = await HelloWorldRepository.update(
                helloWorldIdMock,
                updateValidHelloWorldMock
            );
            expect(wrappedResult.isErr()).toBeTruthy();
            expect(wrappedResult).toEqual(err(HelloWorldError.UpdateError));
        });
        it('should return an error for invalid body', async () => {
            const insert = (
                await HelloWorldRepository.create(createValidHelloWorldMock)
            ).unwrapOr();
            const wrappedResult = await HelloWorldRepository.update(
                insert.id,
                updateInvalidHelloWorldMock
            );
            expect(wrappedResult.isErr()).toBeTruthy();
            expect(wrappedResult).toEqual(err(HelloWorldError.UpdateError));
        });
    });
});
