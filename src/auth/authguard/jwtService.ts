import jwt from 'jsonwebtoken';
import { jwtConstants } from './constant';

const JwtService = {
    sign: (payload: string): string => {
        return jwt.sign(payload, jwtConstants.secret);
    },
    verify: (token: string): jwt.Jwt | jwt.JwtPayload | string => {
        return jwt.verify(token, jwtConstants.secret);
    },
};

export default JwtService;
