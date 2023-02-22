import { helloworld } from '@prisma/client';
import prisma from '../../config/client';
import { Result, ResultAsync } from 'neverthrow';
import { HelloWorldError, HelloWorldErrorEnum } from './helloworld.error';
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
            (e: unknown) => {
                return {
                    message: HelloWorldErrorEnum.FindUniqueError,
                    details: e,
                };
            }
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
            (e: unknown) => {
                return {
                    message: HelloWorldErrorEnum.CreationError,
                    details: e,
                };
            }
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
            (e: unknown) => {
                return {
                    message: HelloWorldErrorEnum.DeletionError,
                    details: e,
                };
            }
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
            (e: unknown) => {
                return {
                    message: HelloWorldErrorEnum.UpdateError,
                    details: e,
                };
            }
        );
    },
};

export default HelloWorldRepository;
