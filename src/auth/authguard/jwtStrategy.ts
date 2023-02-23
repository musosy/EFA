import jwt from 'jsonwebtoken';
import { jwtConstants } from './constant';
import { Request, Response, NextFunction } from 'express';
import Logger from 'src/logger/logger';

const JwtStrategy = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    Logger('jwtstrat').info(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.sendStatus(401);
    const token = authHeader.substring(7, authHeader.length);
    return jwt.verify(token, jwtConstants.secret, (err) => {
        return err ? res.sendStatus(403) : next();
    });
};

export default JwtStrategy;
