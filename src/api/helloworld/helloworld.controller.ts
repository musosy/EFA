import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const helloWorldRouter = t.router({
    all: t.procedure.query(async () => {
        return await HelloWorldService.getAll();
    }),
    create: t.procedure
        .input(
            z.object({
                status: z.number().int(),
                message: z.string().nonempty(),
            })
        )
        .mutation(async ({ input }) => await HelloWorldService.create(input)),
});

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
