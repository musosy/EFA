import { AuthError } from './auth.error';

export type CreateUser = {
    username: string;
    password: string;
};

export type AuthSuccess = {
    status: number;
    expires_in: number;
    access_token: string;
    user_id: string;
};

export type QueryFailed = {
    message: AuthError;
    details: unknown;
};
