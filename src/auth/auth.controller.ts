import { Request, Response, Router } from 'express';
import AuthService from './auth.service';
import JwtStrategy from './authguard/jwtStrategy';

const AuthController = Router();

AuthController.post('/login', async (req: Request, res: Response) => {
    res.json(await AuthService.login(req.body));
});

AuthController.post('/register', async (req: Request, res: Response) => {
    res.json(await AuthService.register(req.body));
});

AuthController.get(
    '/secured-route',
    JwtStrategy,
    async (_req: Request, res: Response) => {
        res.json(AuthService.securedRouteExemple());
    }
);

export default AuthController;
