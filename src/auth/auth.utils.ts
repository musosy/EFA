import { user } from '@prisma/client';
import crypto from 'crypto';
import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Result } from 'neverthrow';
import AuthRepository from './auth.repository';
import { jwtConstants } from './authguard/constant';
import { QueryFailed } from './auth.interface';

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export interface Token {
    expiresIn: number;
    emittedAt: number;
    userId: string;
}

const AuthUtils = {
    hash: (s: string): string => crypto.createHmac('sha256', s).digest('hex'),
    createToken: (payload: string, tokenOptions: SignOptions = {}): string => {
        const tokenSettings = {
            ...AuthUtils.generateTokenSettings(),
            ...tokenOptions,
        };
        return jwt.sign(
            {
                userId: payload,
                ...tokenSettings,
            },
            jwtConstants.secret
        );
    },
    generateTokenSettings: () => {
        return {
            expiresIn: ONE_WEEK_IN_SECONDS,
            emittedAt: Date.now(),
        };
    },
    getTokenPayload: (token: string): Token => {
        return jwt.verify(token, jwtConstants.secret) as Token;
    },
    getUserIdFromToken: async (req: Request, res: Response) => {
        const token = req.cookies.session_id;
        if (token) {
            const { userId, expiresIn, emittedAt } =
                AuthUtils.getTokenPayload(token);
            if (AuthUtils.isTokenExpired(expiresIn, emittedAt)) {
                res.clearCookie('session');
                throw new Error('Session expired');
            }
            const user = await AuthRepository.getOneById(userId);
            if (user.isErr()) {
                res.clearCookie('session');
                throw new Error('session expires');
            }
            return userId;
        }
        return '';
    },
    isTokenExpired: (expiresIn: number, emittedAt: number): boolean =>
        Date.now() > expiresIn * 1000 + emittedAt,
    validate: async (username: string): Promise<Result<user, QueryFailed>> =>
        await AuthRepository.getOneByUsername(username),
};

export default AuthUtils;
