import { Result, Err, Ok } from 'neverthrow';
import AuthRepository from './auth.repository';
import AuthUtils from './auth.utils';
import { CreateUser, AuthSuccess, AuthFailure } from './auth.interface';
import { user } from '@prisma/client';

const AuthService = {
    register: async (
        userDetails: CreateUser
    ): Promise<Result<AuthSuccess, AuthFailure>> => {
        userDetails.password = AuthUtils.hash(userDetails.password);

        const userAlreadyExists = (
            await AuthRepository.getOneByUsername(userDetails.username)
        ).isOk();
        if (userAlreadyExists)
            return new Err({ status: 200, message: 'Username already taken' });

        const newUser = await AuthRepository.create(userDetails);
        return newUser.map((user) => {
            const payload = `${user.id}`;
            const token = AuthUtils.createToken(payload);
            return {
                status: 200,
                expires_in: 3600,
                access_token: token,
                user_id: payload,
            };
        });
    },
    login: async (
        user: CreateUser
    ): Promise<Result<AuthSuccess, AuthFailure>> => {
        const userData = await AuthUtils.validate(user.username);
        return userData
            .andThen<Result<user, string>>((u) => {
                return u.password == AuthUtils.hash(user.password)
                    ? new Ok(u)
                    : new Err('Incorrect password');
            })
            .map((u) => {
                const payload = `${u.id}`;
                const token = AuthUtils.createToken(payload);
                return {
                    status: 200,
                    expires_in: 3600,
                    access_token: token,
                    user_id: payload,
                };
            });
    },
    securedRouteExemple: () => {
        return {
            status: 200,
            message:
                'If you read this message it means you have correctly set your authorization token',
        };
    },
};

export default AuthService;
