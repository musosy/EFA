import { helloworld } from '@prisma/client';
import prisma from '../../config/client';
import { Result, ResultAsync } from 'neverthrow';
import { HelloWorldError } from './helloworld.error';
import { ICreateHelloWorld } from './helloworld.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HelloWorldRepository: any = {
    getAll: async (): Promise<helloworld[]> => {
        return await prisma.helloworld.findMany({
            select: {
                id: true,
                status: true,
                message: true,
            },
        });
    },
    getOne: async (
        id: string
    ): Promise<Result<helloworld, HelloWorldError>> => {
        return ResultAsync.fromPromise(
            prisma.helloworld.findUniqueOrThrow({
                where: {
                    id: id,
                },
            }),
            () => HelloWorldError.FindUniqueError
        );
    },
    create: async ({
        status,
        message,
    }: ICreateHelloWorld): Promise<Result<helloworld, HelloWorldError>> => {
        return ResultAsync.fromPromise(
            prisma.helloworld.create({
                data: {
                    status,
                    message,
                },
            }),
            () => HelloWorldError.CreationError
        );
    },
    delete: async (
        id: string
    ): Promise<Result<helloworld, HelloWorldError>> => {
        return ResultAsync.fromPromise(
            prisma.helloworld.delete({
                where: {
                    id,
                },
            }),
            () => HelloWorldError.DeletionError
        );
    },
    update: async (
        id: string,
        { status, message }: ICreateHelloWorld
    ): Promise<Result<helloworld, HelloWorldError>> => {
        return ResultAsync.fromPromise(
            prisma.helloworld.update({
                where: {
                    id,
                },
                data: {
                    status,
                    message,
                },
            }),
            () => HelloWorldError.UpdateError
        );
    },
};

export default HelloWorldRepository;
