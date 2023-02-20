import { Router, Request, Response } from 'express';
import HelloWorldService from './helloworld.service';
const HelloWorldController: Router = Router();

HelloWorldController.get('/', async (_req: Request, res: Response) => {
    res.json(await HelloWorldService.hello());
});

HelloWorldController.get('/:name', async (req: Request, res: Response) => {
    res.json(await HelloWorldService.helloUser(req.params.name));
});

export default HelloWorldController;