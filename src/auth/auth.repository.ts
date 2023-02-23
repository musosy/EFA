import { user } from '@prisma/client';
import { ResultAsync, Result } from 'neverthrow';
import prisma from 'src/config/client';

const AuthRepository = {
    getOneByUsername: async (username: string): Promise<Result<user, unknown>> => {
        return ResultAsync.fromPromise(
            prisma.user.findUniqueOrThrow({
                where: {
                    username
                }
            }),
            (e) => {
                return {
                    message: 'Could not find user',
                    details: e,
                };
            }
        );
    },
    getOneById: async (userId: string): Promise<Result<user, any>> => {
        return ResultAsync.fromPromise(
            prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            }),
            (e) => {
                return {
                    message: 'Could not find user',
                    details: e
                };
            }
        );
    },
    create: async ({ username, password }: any): Promise<Result<user, any>> => {
        return ResultAsync.fromPromise(
            prisma.user.create({
                data: {
                    username,
                    password
                }
            }),
            (e: unknown) => {
                return {
                    message: 'Could not create user',
                    detail: e,
                };
            }
        );
    },
};

export default AuthRepository;