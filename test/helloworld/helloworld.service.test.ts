import HelloWorldService from '../../src/api/helloworld/helloworld.service';
import { HelloWorldErrorEnum } from '../../src/api/helloworld/helloworld.error';
import prisma from '../../src/config/client';
import {
    createValidHelloWorldMock,
    helloWorldIdMock,
    updateValidHelloWorldMock,
} from './helloworld.mock';

describe('HelloWorldService tests', () => {
    beforeAll(async () => {
        await prisma.helloworld.deleteMany();
    });
    afterEach(async () => {
        await prisma.helloworld.deleteMany();
    });
    describe('getAll tests', () => {
        it('should return an array', async () => {
            const result = await HelloWorldService.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });
    describe('getOne tests', () => {
        it('should return an error', async () => {
            const wrappedResult = await HelloWorldService.getOne(
                helloWorldIdMock
            );
            expect(wrappedResult.isErr()).toBeTruthy();
            expect(wrappedResult._unsafeUnwrapErr()).toHaveProperty('message');
            expect(wrappedResult._unsafeUnwrapErr()).toHaveProperty('details');
            expect(wrappedResult._unsafeUnwrapErr().message).toBe(
                HelloWorldErrorEnum.FindUniqueError
            );
        });
        it('should return the requested entity', async () => {
            const insert = (
                await HelloWorldService.create(createValidHelloWorldMock)
            ).unwrapOr({});
            const wrappedResult = await HelloWorldService.getOne(insert.id);
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr({});
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.status).toEqual(createValidHelloWorldMock.status);
            expect(result.message).toEqual(createValidHelloWorldMock.message);
        });
    });
    describe('create tests', () => {
        it('should return the created entity', async () => {
            const wrappedResult = await HelloWorldService.create(
                createValidHelloWorldMock
            );
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr({});
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.status).toEqual(createValidHelloWorldMock.status);
            expect(result.message).toEqual(createValidHelloWorldMock.message);
        });
    });
    describe('delete tests', () => {
        it('should return the deleted entity', async () => {
            const insert = (
                await HelloWorldService.create(createValidHelloWorldMock)
            ).unwrapOr({});
            const wrappedResult = await HelloWorldService.delete(insert.id);
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr({});
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.id).toEqual(insert.id);
            expect(result.status).toEqual(createValidHelloWorldMock.status);
            expect(result.message).toEqual(createValidHelloWorldMock.message);
            const get = await HelloWorldService.getOne(result.id);
            expect(get.isErr()).toBeTruthy();
        });
        it('should return an error', async () => {
            const wrappedResult = await HelloWorldService.delete(
                helloWorldIdMock
            );
            expect(wrappedResult.isErr()).toBeTruthy();
            expect(wrappedResult._unsafeUnwrapErr()).toHaveProperty('message');
            expect(wrappedResult._unsafeUnwrapErr()).toHaveProperty('details');
            expect(wrappedResult._unsafeUnwrapErr().message).toBe(
                HelloWorldErrorEnum.DeletionError
            );
        });
    });
    describe('update tests', () => {
        it('should update the entity', async () => {
            const insert = (
                await HelloWorldService.create(createValidHelloWorldMock)
            ).unwrapOr({});
            const wrappedResult = await HelloWorldService.update(
                insert.id,
                updateValidHelloWorldMock
            );
            expect(wrappedResult.isOk()).toBeTruthy();
            const result = wrappedResult.unwrapOr({});
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result.id).toEqual(insert.id);
            expect(result.status).toEqual(updateValidHelloWorldMock.status);
            expect(result.message).toEqual(updateValidHelloWorldMock.message);
        });
        it('should return an error for invalid id', async () => {
            const wrappedResult = await HelloWorldService.update(
                helloWorldIdMock,
                updateValidHelloWorldMock
            );
            expect(wrappedResult.isErr()).toBeTruthy();
            expect(wrappedResult._unsafeUnwrapErr()).toHaveProperty('message');
            expect(wrappedResult._unsafeUnwrapErr()).toHaveProperty('details');
            expect(wrappedResult._unsafeUnwrapErr().message).toBe(
                HelloWorldErrorEnum.UpdateError
            );
        });
    });
});
