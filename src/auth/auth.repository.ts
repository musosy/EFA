import { user } from '@prisma/client';
import { ResultAsync, Result } from 'neverthrow';
import prisma from '../config/client';
import { CreateUser, QueryFailed } from './auth.interface';

const AuthRepository = {
    getOneByUsername: async (
        username: string
    ): Promise<Result<user, QueryFailed>> => {
        return ResultAsync.fromPromise(
            prisma.user.findUniqueOrThrow({
                where: {
                    username,
                },
            }),
            (e) => {
                return {
                    message: 'Could not find user',
                    details: e,
                };
            }
        );
    },
    getOneById: async (userId: string): Promise<Result<user, QueryFailed>> => {
        return ResultAsync.fromPromise(
            prisma.user.findUniqueOrThrow({
                where: {
                    id: userId,
                },
            }),
            (e) => {
                return {
                    message: 'Could not find user',
                    details: e,
                };
            }
        );
    },
    create: async ({
        username,
        password,
    }: CreateUser): Promise<Result<user, QueryFailed>> => {
        return ResultAsync.fromPromise(
            prisma.user.create({
                data: {
                    username,
                    password,
                },
            }),
            (e) => {
                return {
                    message: 'Could not create user',
                    details: e,
                };
            }
        );
    },
};

export default AuthRepository;
