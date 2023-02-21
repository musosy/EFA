import { Router, Request, Response } from 'express';
import HelloWorldService from './helloworld.service';

const HelloWorldController: Router = Router();

HelloWorldController.get('/', async (_req: Request, res: Response) => {
    res.json(await HelloWorldService.getAll());
});

HelloWorldController.get('/:id', async (req: Request, res: Response) => {
    res.json(await HelloWorldService.getOne(req.params.id));
});

HelloWorldController.post('/', async (req: Request, res: Response) => {
    res.json(await HelloWorldService.create(req.body));
});

HelloWorldController.put('/:id', async (req: Request, res: Response) => {
    res.json(await HelloWorldService.update(req.params.id, req.body));
});

HelloWorldController.delete('/:id', async (req: Request, res: Response) => {
    res.json(await HelloWorldService.delete(req.params.id));
});

export default HelloWorldController;